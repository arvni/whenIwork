<?php

namespace App\Repositories;

use App\Interfaces\RoomRepositoryInterface;
use App\Models\Role;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Auth;
use Morilog\Jalali\Jalalian;
use Spatie\Permission\Models\Permission;

class RoomRepository implements RoomRepositoryInterface
{

    private Room $room;

    public function __construct(Room $room)
    {
        $this->room = $room;
    }

    public function list(array $queryData, $type = "admin")
    {

        $query = $this->createQuery($type);
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }


    public function create(array $roomData)
    {
        $room = new $this->room($roomData);
        $room->Department()->associate($roomData["department"]["id"]);
        $room->save();
        $this->createPermissions($room->id, $roomData["department"]["id"]);
        $this->storeManagers($room, $roomData["managers"]);
        return $room;

    }

    private function createPermissions($roomId, $departmentId)
    {
        Permission::findOrCreate("admin.Department.$departmentId.Room.$roomId");
        Permission::findOrCreate("client.Department.$departmentId.Room.$roomId");
    }

    public function show(Room $room)
    {
        $room->load(["Department" => function ($q) {
            $q->select(["id", "name"]);
        }]);
        $room->managers = $room->Managers()->get(["id", "name"]);
        return $room;
    }

    public function shiftList(Room $room, array $queryData)
    {
        $query = $room->Shifts()->with(["Attendances" => function ($q) {
            $q->with("attendable");
        }]);
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"] ?? ["field" => "date", "sort" => "asc"]);
        $shifts = $query->get();
        return $this->prepareWeekDays($shifts, $queryData["filters"]["date"]);
    }

    private function prepareWeekDays($shifts, $dates = [])
    {
        $week["date"] = $dates;
        $week["days"] = [];
        for ($i = 0; $i < 7; $i++) {
            $startOfDay = Carbon::parse($dates[0])->addDays($i)->startOfDay();
            $endOfDay = Carbon::parse($dates[0])->addDays($i)->endOfDay();
            $dateShifts = $shifts->whereBetween("started_at_dateTime", [$startOfDay, $endOfDay])->flatten(1);
            $week["days"][] = [
                "title" => Jalalian::fromCarbon($startOfDay)->format("%A, %d %B %Y"),
                "today" => Carbon::now()->format("Y-m-d") === $startOfDay->format("Y-m-d"),
                "date" => $startOfDay->format("Y-m-d"),
                "shifts" => $dateShifts
            ];
        }

        return $week;
    }

    public function edit(Room $room, $roomNewData)
    {
        $room->Department()->associate($roomNewData["department"]["id"]);
        $room->update($roomNewData);
        $this->storeManagers($room, $roomNewData["managers"]);
        return $room;
    }

    public function delete(Room $room): bool
    {
        if ($room->Shifts()->count() < 1)
            return $room->delete();
        return false;
    }

    private function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->where("name", "like", "%" . $filters["search"] . "%");
        }
    }

    private function applyOrderBy($query, $orderBy)
    {
        $query->orderBy($orderBy["field"], $orderBy["sort"]);
    }

    private function applyPaginate($query, $pageSize)
    {
        return $query->paginate($pageSize);
    }

    public function findById($id)
    {
        return $this->room->find($id);
    }

    private function storeManagers(Room $room, array $users)
    {
        $permission = Permission::findByName("admin.Department.$room->department_id.Room.$room->id");
        $permission->Users()->sync(collect($users)->pluck("id")->toArray());
    }

    private function createQuery($type = "admin")
    {
        if (auth()->user()->can("$type.departments.index"))
            return $this->room->with("Department");
        $permissions = auth()->user()->permissions()->where("name", "like", "$type.Department.%")->get(["name"])->pluck("name");
        $departments = [];
        $rooms = [];
        foreach ($permissions as $permission) {
            $explodedPermissionName = explode(".", $permission);
            if (count($explodedPermissionName) == 3)
                $departments[] = last($explodedPermissionName);
            else
                $rooms[] = last($explodedPermissionName);
        }



        return $this->room->where(function ($q) use ($departments, $rooms) {
            $q->whereIn("id", $rooms)->orWhereIn("department_id", $departments);
        })->with("Department");
    }

    public function allowedUsersList(Room $room, array $queryData)
    {
        return User::permission("client.Department.$room->department_id.Room.$room->id")
            ->search($queryData["search"] ?? "")
            ->select(["id", "name"])
            ->paginate(10);
    }

    public function allowedRolesList(Room $room, array $queryData)
    {
        return Role::permission("client.Department.$room->department_id.Room.$room->id")
            ->search($queryData["search"] ?? "")
            ->select(["id", "name"])
            ->paginate(10);
    }

}
