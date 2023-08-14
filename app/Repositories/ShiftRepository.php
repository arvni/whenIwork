<?php

namespace App\Repositories;

use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Attendance;
use App\Models\Shift;
use App\Models\User;
use App\Models\Work;
use Carbon\Carbon;

class ShiftRepository implements ShiftRepositoryInterface
{

    private Shift $shift;

    public function __construct(Shift $shift)
    {
        $this->shift = $shift;
    }

    public function list(array $queryData)
    {
        $query = $this->shift->with("Room");
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }

    public function clientList(array $queryData)
    {
        $query = $this->getQuery()
            ->active()
            ->with([
                "Room" => function ($q) {
                    $q->select("id", "name", "department_id")
                        ->with([
                            "Department" => function ($qu) {
                                $qu->select("name", "id");
                            }
                        ]);
                },
                "ClientRequests" => function ($q) {
                    $q->whereHas("User", function ($qu) {
                        $qu->where("id", auth()->user()->id);
                    })->with(["RevisableBy" => function ($qu) {
                        $qu->select(["name", "id"]);
                    }]);
                }])
            ->withCount([
                "ClientRequests" => function ($q) {
                    $q->where("user_id", auth()->user()->id);
                }]);
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }

    public function create(array $shiftData)
    {
        $shift = new $this->shift($shiftData);
        $shift->date = Carbon::parse($shiftData["date"]);
        $shift->Room()->associate($shiftData["room"]["id"]);
        $shift->save();
        $this->createOrUpdateAttendances($shift, $shiftData["related"]);
        return $shift;

    }

    public function show(Shift $shift)
    {
        $shift->load(["Room" => function ($q) {
            $q->select(["id", "name"]);
        }, "Attendances" => function ($q) {
            $q->with(["attendable" => function ($query) {
                $query->select("name", "id");
            }]);
        }]);
        return $shift;
    }

    public function edit(Shift $shift, $shiftNewData)
    {
        $shift->Room()->associate($shiftNewData["room"]["id"]);
        $shift->update($shiftNewData);
        $this->createOrUpdateAttendances($shift, $shiftNewData["related"]);
        return $shift;
    }

    public function delete(Shift $shift): bool
    {
        if ($shift->Works()->started()->count() < 1) {
            return $shift->Works()->delete() && $shift->delete();
        }
        return false;
    }

    private function createOrUpdateAttendances(Shift $shift, array $attendances)
    {
        $shift->Attendances()->delete();
        $shift->Works()->delete();
        if ($shift->type == "open") {
            foreach ($attendances as $attendance) {
                $newAttendance = new Attendance();
                $newAttendance->Shift()->associate($shift);
                $newAttendance->attendable()->associate($attendance["class"]::find($attendance["id"]));
                $newAttendance->save();
            }
        } else {
            $attendance = new Attendance();
            $attendance->Shift()->associate($shift);
            $attendance->attendable()->associate($attendances["class"]::find($attendances["id"]));
            $attendance->save();
            $this->createWork($shift, $attendances["id"]);
        }
    }

    public function requestsList(Shift $shift, array $queryData)
    {
        $query = $shift->ClientRequests();
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"] ?? ["field" => "id", "sort" => "asc"]);
        $shifts = $query->get();
        return $this->prepareRequests($shifts, $queryData["filters"]["date"]);
    }

    private function applyFilters($query, $filters)
    {
        if (isset($filters["date"])) {
            $query->whereBetween("date", $filters["date"]);
        }
        if (isset($filters["type"])) {
            $query->where("type", $filters["type"]);
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
        return $this->shift->find($id);
    }

    public function getQuery()
    {
        return $this->shift->where(function ($query) {
            $query->whereHas("Roles", function ($q) {
                $q->whereIn("roles.id", auth()->user()->roles()->select("id"));
            })->orWhereHas("Users", function ($q) {
                $q->where("users.id", auth()->user()->id);
            });
        });
    }

    private function createWork(Shift $shift, $userId)
    {
        $work = new Work(["accepted" => true]);
        $work->Shift()->associate($shift);
        $work->User()->associate($userId);
        $work->save();
    }

}
