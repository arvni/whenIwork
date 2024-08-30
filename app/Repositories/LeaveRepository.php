<?php

namespace App\Repositories;

use App\Interfaces\LeaveRepositoryInterface;
use App\Models\Leave;
use App\Models\User;
use App\Notifications\LeaveRequestAccepted;
use Carbon\Carbon;
use Illuminate\Support\Facades\Notification;

class LeaveRepository extends BaseRepository implements LeaveRepositoryInterface
{

    public function __construct(Leave $leave)
    {

        parent::__construct($leave, Leave::query());
    }


    public function listAllowed(array $queryData)
    {
        $this->query = $this->getQuery()
            ->with(["Acceptor:name,id", "User:name,id"]);
        return $this->list($queryData);
    }

    public function create(array $data)
    {
        $leave = new $this->model($data);

        if ($data["type"] !== "daily") {
            $leave->started_at = Carbon::parse($data["date"])->setTime(...explode(":", $data["range"]["from"]));
            $leave->ended_at = Carbon::parse($data["date"])->setTime(...explode(":", $data["range"]["to"]));
        } else {
            if (count($data["range"])>1)
                list($started_at, $ended_at) = $data["range"];
            else {
                $started_at = $data["range"][0];
                $ended_at = $data["range"][0];
            }
            $leave->started_at = Carbon::parse($started_at)->startOfDay();
            $leave->ended_at = Carbon::parse($ended_at)->endOfDay();
        }

        $leave->User()->associate(auth()->user()->id);
        $leave->save();
        return $leave;

    }

    public function show(Leave $leave)
    {

        return $leave;
    }

    public function edit(Leave $leave, $leaveNewData)
    {

        return $leave;
    }

    public function delete(Leave $leave): bool
    {

        return false;
    }

    protected function applyFilters($query, $filters)
    {
        if (isset($filters["status"]))
            $query->status($filters["status"]);

        if (isset($filters["date"])) {
            $query->whereBetween("started_at", $filters["date"]);
        }

        if (isset($filters["user_id"]))
            $query->whereHas("User", function ($q) use ($filters) {
                $q->where("id", $filters["user_id"]);
            });
        return $query;
    }

    public function findById($id)
    {
        return $this->query->find($id);
    }

    public function getQuery()
    {
        return $this->query;
    }


    public function requestsList(Leave $leave, array $queryData)
    {
        // TODO: Implement requestsList() method.
    }

    public function accept(Leave $leave)
    {
        $leave->Acceptor()->associate(auth()->user());
        $leave->status = "accepted";
        $leave->save();
        $leave->load("User");
        Notification::send([$leave->User],new LeaveRequestAccepted($leave));
    }

    public function reject(Leave $leave)
    {
        $leave->Acceptor()->associate(auth()->user());
        $leave->status = "rejected";
        $leave->save();
    }
}
