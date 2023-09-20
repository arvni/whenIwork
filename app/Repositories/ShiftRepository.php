<?php

namespace App\Repositories;

use App\Interfaces\ShiftRepositoryInterface;
use App\Interfaces\WorkRepositoryInterface;
use App\Models\Attendance;
use App\Models\ClientRequest;
use App\Models\Shift;
use App\Models\User;
use App\Models\Work;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;

class ShiftRepository extends BaseRepository implements ShiftRepositoryInterface
{
    protected WorkRepositoryInterface $workRepository;

    public function __construct(Shift $shift, WorkRepositoryInterface $workRepository)
    {
        $this->workRepository = $workRepository;
        parent::__construct($shift, Shift::query());
    }

    public function listAllowed(array $queryData)
    {
        $this->query = $this->getQuery()
            ->active()
            ->with([
                "Room.Department:name,id",
                "ClientRequests" => function ($q) {
                    $q->whereHas("User", function ($qu) {
                        $qu->where("id", auth()->user()->id);
                    })->with(["RevisableBy:name,id", "Requestable"]);
                }])
            ->withCount([
                "ClientRequests" => function ($q) {
                    $q->where("user_id", auth()->user()->id);
                }, "Works" => fn($q) => $q->where("user_id", auth()->user()->id)]);
        return $this->list($queryData);
    }

    public function create(array $data)
    {
        $shift = new $this->model($data);
        $shift->date = Carbon::parse($data["date"]);
        $shift->Room()->associate($data["room"]["id"]);
        $shift->save();
        if ($shift->type !== "open")
            $this->createWork($shift, $data["related"]["id"]);
        else
            $shift->Roles()->sync(collect($data["related"])->pluck("id")->toArray());

        return $shift;
    }

    public function show(Shift $shift)
    {
        $shift->load(["Room:id,name", "Works.User:name,id", "Roles:name,id"]);
        return $shift;
    }

    public function edit(Shift $shift, $shiftNewData)
    {
        $shift->Room()->associate($shiftNewData["room"]["id"]);
        $shift->update($shiftNewData);
        $shift->Works()->delete();
        if ($shift->type !== "open")
            $this->createWork($shift, $shiftNewData["related"]["id"]);
        else
            $shift->Roles()->sync(collect($shiftNewData["related"])->pluck("id")->toArray());
        return $shift;
    }

    public function delete(Shift $shift): bool
    {
        if (Carbon::parse($shift->date . " " . $shift->started_at)->getTimestamp() - Carbon::now()->getTimestamp() > 0) {
            $shift->ClientRequests()->delete();
            $shift->Works()->delete();
            return $shift->delete();
        }
        return false;
    }

    public function requestsList(Shift $shift, array $queryData)
    {
        $query = $shift->ClientRequests();
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"] ?? ["field" => "id", "sort" => "asc"]);
        $shifts = $query->get();
        return $this->prepareRequests($shifts, $queryData["filters"]["date"]);
    }

    protected function applyFilters($query, $filters)
    {
        if (isset($filters["date"])) {
            $query->whereBetween("date", $filters["date"]);
        }
        if (isset($filters["type"])) {
            $query->where("type", $filters["type"]);
        }
        if (isset($filters["user_id"])) {
            $query->WhereHas("Users", function ($q) use ($filters) {
                $q->where("users.id", $filters["user_id"]);
            });
        }
        return $query;
    }

    public function findById($id)
    {
        return $this->query->find($id);
    }

    public function getQuery()
    {
        return $this->query->active()->whereHas("Roles", function ($q) {
            $q->whereIn("id", auth()
                ->user()
                ->roles()->select("id"));
        })->orWhereHas("Users", function ($q) {
            $q->where("users.id", auth()->user()->id);
        });
    }

    private function createWork(Shift $shift, $userId)
    {
        $this->workRepository->create([
            "user_id" => $userId,
            "shift_id" => $shift->id,
            "accepted" => true
        ]);
    }

    public function changeUser(Shift $shift, ClientRequest $clientRequest)
    {
        $baseRequest = $shift->ClientRequests()->where("type", "changeUser")->where("revisable_by_id", $clientRequest->user_id)->first();
        $work = $shift->Works()->where("user_id", $baseRequest->user_id)->first();
        $this->workRepository->changeUser($work, $clientRequest->user_id);
    }

    public function acceptOpenShift(Shift $shift, ClientRequest $clientRequest)
    {
        $this->workRepository->create([
            "user_id" => $clientRequest->user_id,
            "shift_id" => $shift->id,
            "accepted" => true
        ]);
    }

    public function publish(Shift $shift)
    {
        $shift->update(["isActive" => true]);
    }
}
