<?php

namespace App\Repositories;

use App\Interfaces\ClientRequestRepositoryInterface;
use App\Interfaces\LeaveRepositoryInterface;
use App\Interfaces\PermissionRepositoryInterface;
use App\Interfaces\ShiftRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Interfaces\WorkRepositoryInterface;
use App\Models\ClientRequest;
use App\Models\Leave;
use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Spatie\Permission\Models\Permission;

class ClientRequestRepository extends BaseRepository implements ClientRequestRepositoryInterface
{

    private PermissionRepositoryInterface $permissionRepository;
    private UserRepositoryInterface $userRepository;
    private ShiftRepositoryInterface $shiftRepository;
    private LeaveRepositoryInterface $leaveRepository;

    public function __construct(ClientRequest $clientRequest,
                                PermissionRepositoryInterface $permissionRepository,
                                UserRepositoryInterface $userRepository,
                                ShiftRepositoryInterface $shiftRepository,
                                LeaveRepositoryInterface $leaveRepository)
    {
        $this->permissionRepository = $permissionRepository;
        $this->leaveRepository = $leaveRepository;
        $this->userRepository = $userRepository;
        $this->shiftRepository = $shiftRepository;
        $this->query = $clientRequest->with(['requestable', 'revisableBy:id,name', 'user:id,name']);
        parent::__construct($clientRequest, $this->query);
    }

    public function adminList($queryData)
    {
        $this->query->where(function ($q) {
            if (Gate::allows("check", Leave::class)) {
                $q->where("type", "takeLeave");
            }
            $q->orWhere(fn($qu) => $this->applyAllowedRooms($qu));
        })->withAggregate("user", "name");

        if (isset(optional($queryData["filters"])["date"])) {
            $this->query->whereBetween("created_at", $queryData["filters"]["date"]);
        }

        $this->applyOrderBy($this->query, $queryData["sort"]);
        return fn() => $this->applyPaginate($this->query, $queryData["pageSize"]);
    }

    public function create(array $clientRequestData)
    {
        $clientRequest = $this->model->fill($clientRequestData);
        $clientRequest->user()->associate(auth()->user()->id);
        $this->setRelation($clientRequest, $clientRequestData);
        $clientRequest->save();
        return $clientRequest;
    }

    public function show($id)
    {
        return $this->query->with(["requestable", "requestable.room:id,name"])->find($id);
    }

    public function edit(ClientRequest $clientRequest, $clientRequestNewData)
    {
        $clientRequest->fill($clientRequestNewData);
        if ($clientRequest->isDirty())
            $clientRequest->update();
        return $clientRequest;
    }

    public function delete(ClientRequest $clientRequest): bool
    {
        if ($clientRequest->status == "waiting") {
            return $clientRequest->delete();
        }
        return false;
    }


    protected function applyFilters($query, $filters)
    {
        if (isset($filters["type"]) && $filters["type"] === "revised") {
            $query->where("revisable_by_id", auth()->user()->id)->where("type", "changeUser");
        } else if (isset($filters["type"])) {
            $query->where("user_id", auth()->user()->id)->where("type", $filters["type"]);
        } else
            $query->where("user_id", auth()->user()->id)->where("type", "shift");
        if (isset($filters["date"])) {
            $query->whereBetween("created_at", $filters["date"]);
        }
        return $query;
    }

    private function setRelation(ClientRequest $clientRequest, array $clientRequestData)
    {
        $type = $clientRequest->type;
        switch ($type) {
            case "changeUser":
                $this->setChangeUserRelation($clientRequest, $clientRequestData);
                break;
            case "shift":
                $this->setShiftRelation($clientRequest, $clientRequestData);
                break;
            case "takeLeave":
                $this->createOrUpdateLeave($clientRequest, $clientRequestData["requestable"]);
        }
    }

    private function setChangeUserRelation(ClientRequest $clientRequest, array $clientRequestData)
    {
        $shift = $this->shiftRepository->findById($clientRequestData["requestable"]["id"]);
        $user = $this->userRepository->findById($clientRequestData["revisable_by"]["id"]);
        $clientRequest->requestable()->associate($shift);
        $clientRequest->revisableBy()->associate($user);
    }

    private function setShiftRelation(ClientRequest $clientRequest, array $clientRequestData)
    {
        $shift = $this->shiftRepository->findById($clientRequestData["requestable"]["id"]);
        $clientRequest->requestable()->associate($shift);
        $clientRequest->revisableBy()->associate(null);
    }

    public function cancel(ClientRequest $clientRequest)
    {
        if ($clientRequest->status == "waiting")
            $clientRequest->update(["status" => "canceled"]);
        return $clientRequest;
    }

    public function confirm(ClientRequest $clientRequest)
    {
        $clientRequest->status = "accepted";
        $oldUser = $clientRequest->User->name;
        $clientRequest->save();
        $newClientRequest = $this->model->fill([
            "type" => "changeUser",
            "message" => "تغییر شیفت از کاربر $oldUser"
        ]);
        $newClientRequest->User()->associate(auth()->user()->id);
        $newClientRequest->Requestable()->associate($clientRequest->Requestable);
        $newClientRequest->save();
    }

    public function adminReject(ClientRequest $clientRequest, $requestDetails)
    {
        $clientRequest->RevisableBy()->associate(auth()->user()->id);
        $clientRequest->status = "rejected";
        $clientRequest->comment = $requestDetails["comment"] ?? "";
        $clientRequest->save();
        if ($clientRequest->type === "takeLeave")
            $this->leaveRepository->reject($clientRequest->Requestable);
        if ($clientRequest->type === "changeUser")
            $clientRequest->Requestable->ClientRequests()->where("revisable_by_id", $clientRequest->user_id)->first()->update(["comment" => $requestDetails["comment"] ?? "درخواست از طرف مدیر لغو شد", "status" => "rejected"]);

    }

    public function reject(ClientRequest $clientRequest, $requestDetails)
    {
        $clientRequest->status = "rejected";
        $clientRequest->comment = $requestDetails["comment"] ?? "";
        $clientRequest->save();

    }

    public function adminConfirm(ClientRequest $clientRequest)
    {
        $clientRequest->RevisableBy()->associate(auth()->user()->id);
        $clientRequest->status = "accepted";
        $clientRequest->save();

        switch ($clientRequest->type) {
            case "changeUser":
                $this->shiftRepository->changeUser($clientRequest->Requestable, $clientRequest);
                break;
            case "takeLeave":
                $this->leaveRepository->accept($clientRequest->Requestable);
                break;
            case "shift":
                $this->shiftRepository->acceptOpenShift($clientRequest->Requestable, $clientRequest);
                break;
        }
    }

    private function createOrUpdateLeave(ClientRequest $clientRequest, $data)
    {
        if (!$clientRequest->id) {
            $leave = $this->leaveRepository->create($data);
            $clientRequest->Requestable()->associate($leave);
        } else
            $this->leaveRepository->edit($clientRequest->Requestable, $data);
    }

    private function applyAllowedRooms($query)
    {
        list($rooms, $departments) = $this->getRoomsAndDepartmentsIds();
        $query->whereHas("Shift", function ($q) use ($rooms, $departments) {
            $q->whereHas("Room", function ($qu) use ($rooms, $departments) {
                $qu->whereIn("id", $rooms)->orWhereHas("Department", function ($qur) use ($departments) {
                    $qur->whereIn("id", $departments);
                });
            });
        });
    }

    private function getRoomsAndDepartmentsIds()
    {
        $permissions = auth()
            ->user()
            ->getAllPermissions()
            ->pluck("name")
            ->filter(fn($item) => preg_match("/^admin\.Department\..*$/", $item));
        $departments = [];
        $rooms = [];
        foreach ($permissions as $permission) {
            $explodedPermissionName = explode(".", $permission);
            if (count($explodedPermissionName) == 3)
                $departments[] = last($explodedPermissionName);
            else
                $rooms[] = last($explodedPermissionName);
        }

        return [$rooms, $departments];
    }

}
