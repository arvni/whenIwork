<?php

namespace App\Repositories;

use App\Interfaces\LeaveRepositoryInterface;
use App\Models\Leave;
use App\Models\User;
use Carbon\Carbon;

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
            list($started_at, $ended_at) = $data["range"];
            $leave->started_at = Carbon::parse($started_at);
            $leave->ended_at = Carbon::parse($ended_at);
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
    }

    public function reject(Leave $leave)
    {
        $leave->Acceptor()->associate(auth()->user());
        $leave->status = "rejected";
        $leave->save();
    }
}
