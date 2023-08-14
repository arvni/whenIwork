<?php

namespace App\Repositories;

use App\Interfaces\ClientRequestRepositoryInterface;
use App\Models\Attendance;
use App\Models\ClientRequest;
use App\Models\Room;
use App\Models\Shift;
use App\Models\User;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class ClientRequestRepository implements ClientRequestRepositoryInterface
{

    private ClientRequest $clientRequest;

    public function __construct(ClientRequest $clientRequest)
    {

        $this->clientRequest = $clientRequest;
    }

    public function list(array $queryData)
    {
        $query = $this->clientRequest->with(["requestable", "user" => function ($q) {
            $q->select("id", "name");
        }],);
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }


    public function create(array $clientRequestData)
    {
        $clientRequest = new $this->clientRequest($clientRequestData);
        $clientRequest->User()->associate(auth()->user()->id);
        $this->setRelation($clientRequest, $clientRequestData);
        $clientRequest->save();
        return $clientRequest;

    }

    public function show(ClientRequest $clientRequest)
    {
        $clientRequest->load(["Room" => function ($q) {
            $q->select(["id", "name"]);
        }, "Attendances" => function ($q) {
            $q->with(["attendable" => function ($query) {
                $query->select("name", "id");
            }]);
        }]);
        return $clientRequest;
    }

    public function edit(ClientRequest $clientRequest, $clientRequestNewData)
    {
        $clientRequest->Room()->associate($clientRequestNewData["room"]["id"]);
        $clientRequest->update($clientRequestNewData);
        $this->createOrUpdateAttendances($clientRequest, $clientRequestNewData["related"]);
        return $clientRequest;
    }

    public function delete(ClientRequest $clientRequest): bool
    {
        if ($clientRequest->Works()->count() < 1) {
            return $clientRequest->delete();
        }
        return false;
    }

    private function createOrUpdateAttendances(ClientRequest $clientRequest, array $attendances)
    {
        $clientRequest->Attendances()->delete();
        if ($clientRequest->type == "open") {
            foreach ($attendances as $attendance) {
                $newAttendance = new Attendance();
                $newAttendance->ClientRequest()->associate($clientRequest);
                $newAttendance->attendable()->associate($attendance["class"]::find($attendance["id"]));
                $newAttendance->save();
            }
        } else {
            $attendance = new Attendance();
            $attendance->ClientRequest()->associate($clientRequest);
            $attendance->attendable()->associate($attendances["class"]::find($attendances["id"]));
            $attendance->save();
        }
    }

    public function requestsList(ClientRequest $clientRequest, array $queryData)
    {
        $query = $clientRequest->Requests();
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["orderBy"] ?? ["field" => "started_at", "sort" => "asc"]);
        $clientRequests = $query->get();
        return $this->prepareRequests($clientRequests, $queryData["filters"]["date"]);
    }

    private function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->where("name", "like", "%" . $filters["search"] . "%");
        }
        if (isset($filters["date"])) {
            $query->whereBetween("started_at", $filters["date"]);
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
        return $this->clientRequest->find($id);
    }

    private function storeManagers(ClientRequest $clientRequest, array $users)
    {
        $permission = Permission::findByName("admin.Department.$clientRequest->department_id.ClientRequest.$clientRequest->id");
        $permission->Users()->sync(collect($users)->pluck("id")->toArray());
    }

    public function getQuery()
    {
        return $this->clientRequest->where(function ($query) {
            $query->whereHas("Roles", function ($q) {
                $q->whereIn("roles.id", auth()->user()->roles()->select("id"));
            })->orWhereHas("Users", function ($q) {
                $q->whereId(auth()->user()->id);
            });
        });
    }

    private function setRelation(ClientRequest $clientRequest, array $clientRequestData)
    {
        switch ($clientRequest->type) {
            case "changeUser":
                $clientRequest->requestable()->associate(Shift::find($clientRequestData["shift"]["id"]));
                $user = User::find($clientRequestData["changeUser"]["id"]);
                $clientRequest->RevisableBy()->associate($user);
                return;
            case "openShift":
                $clientRequest->requestable()->associate(Shift::find($clientRequestData["shift"]["id"]));
                $room = Room::find($clientRequestData["shift"]["room"]["id"]);
                $clientRequest->RevisableBy()->associate(Role::findByName("admin.Department.$room->department_id.Room.$room->id"));
                return;
            case "takeLeave";
                break;
        }
    }

}
