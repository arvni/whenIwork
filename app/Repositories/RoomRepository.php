<?php

namespace App\Repositories;

use App\Interfaces\PermissionRepositoryInterface;
use App\Interfaces\RoomRepositoryInterface;
use App\Models\Role;
use App\Models\Room;
use App\Models\User;
use Carbon\Carbon;
use JetBrains\PhpStorm\Pure;
use Morilog\Jalali\Jalalian;

class RoomRepository extends BaseRepository implements RoomRepositoryInterface
{
    private PermissionRepositoryInterface $permissionRepository;

    #[Pure]
    public function __construct(Room $room, PermissionRepositoryInterface $permissionRepository)
    {
        parent::__construct($room, Room::query()->withAggregate("Department", "name"));
        $this->permissionRepository = $permissionRepository;
    }

    public function listAllowed(array $queryData)
    {
        $this->query = $this->createQuery();
        return $this->list($queryData);
    }


    public function create(array $data)
    {
        $room = new $this->model($data);
        $room->Department()->associate($data["department"]["id"]);
        $room->save();
        $this->createPermissions($room->id, $data["department"]["id"]);
        return $room;

    }

    private function createPermissions($roomId, $departmentId)
    {
        $permissionNames = [
            "admin.Department.$departmentId.Room.$roomId",
            "client.Department.$departmentId.Room.$roomId"
        ];

        foreach ($permissionNames as $name) {
            $this->permissionRepository->findOrCreateByName($name);
        }

    }

    public function show(Room $room)
    {
        $room->load(["Department" => function ($q) {
            $q->select(["id", "name"]);
        }]);
        return $room;
    }

    public function shiftList(Room $room, array $queryData)
    {
        $query = $room->Shifts()
            ->with(["Users:name,id", "Roles:name,id",])
            ->withCount(["AcceptedClientRequests", "WaitingClientRequests", "ClientRequests"]);

        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"] ?? ["field" => "date", "sort" => "asc"]);

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
        $room->fill($roomNewData);
        $room->Department()->associate($roomNewData["department"]["id"]);
        if ($room->isDirty())
            $room->update();
        return $room;
    }

    public function delete(Room $room): bool
    {
        if ($room->Shifts()->count() < 1)
            return $room->delete();
        return false;
    }

    protected function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->search($filters["search"]);
        }
        if (isset($filters["date"])) {
            $query->whereBetween("date", $filters["date"]);
        }
        return $query;
    }


    public function findById($id)
    {

        return $this->model->find($id);
    }

    private function createQuery()
    {
        $permissions = auth()->user()->permissions()->where("name", "like", "client.Department.%")->get(["name"])->pluck("name");
        $departments = [];
        $rooms = [];
        foreach ($permissions as $permission) {
            $explodedPermissionName = explode(".", $permission);
            if (count($explodedPermissionName) == 3)
                $departments[] = last($explodedPermissionName);
            else
                $rooms[] = last($explodedPermissionName);
        }

        return $this->model->where(function ($q) use ($departments, $rooms) {
            $q->whereIn("id", $rooms)->orWhereIn("department_id", $departments);
        })->with("Department");
    }

    public function allowedUsersList(Room $room, array $queryData)
    {
        $permission = "client.Department.$room->department_id.Room.$room->id";
        return User::permission($permission)
            ->search($queryData["search"] ?? "")
            ->select(["id", "name"])
            ->paginate(10);
    }

    public function allowedRolesList(Room $room, array $queryData)
    {
        return Role::whereHas("permissions", function ($q) use ($room) {
            $q->where("name", "client.Department.$room->department_id.Room.$room->id");
        })
            ->search($queryData["search"] ?? "")
            ->paginate(10);
    }

    public function countShifts(Room $room, $queryData)
    {
        $query = $room->Shifts();
        $this->applyFilters($query, $queryData["filters"]);
        return $query->count();
    }

    public function duplicateShifts(Room $room, array $date)
    {
        list($from, $to) = $date;
        $fromDate = Carbon::parse($from, "Asia/Tehran")->subDays(7)->toDate();
        $toDate = Carbon::parse($to, "Asia/Tehran")->subDays(7)->toDate();
        $shifts = $room->Shifts()->whereBetween("date", [$fromDate, $toDate])->with(["roles:id", "works"])->get();
        foreach ($shifts as $shift) {
            $newShift = $shift->replicate();
            $newShift->date = Carbon::parse($shift->date)->addDays(7);
            $newShift->isActive = false;
            $newShift->save();
            if ($shift->type === "open") {
                $newShift->Roles()->sync($shift->Roles->pluck("id")->toArray());
            } else {
                $newShift->Works()->SaveMany($shift->Works->map(function ($work) {
                    unset($work->id);
                    unset($work->shift_id);
                    unset($work->accepted);
                    unset($work->created_at);
                    unset($work->updated_at);
                    unset($work->changed);
                    return $work;
                }));
            }
        }
    }
}
