<?php

namespace App\Repositories;

use App\Interfaces\LeaveRepositoryInterface;
use App\Models\Attendance;
use App\Models\Leave;
use Carbon\Carbon;
use Spatie\Permission\Models\Permission;

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
        $leave->startedAt = Carbon::parse($data["date"] . "");
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
        if (isset($filters["date"])) {
            $query->whereBetween("date", $filters["date"]);
        }
        if (isset($filters["type"])) {
            $query->where("type", $filters["type"]);
        }
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


    public function requestsList(Leave $shift, array $queryData)
    {
        // TODO: Implement requestsList() method.
    }

    public function accept(Leave $leave)
    {
        $leave->Acceptor()->associate(auth()->user());
        $leave->accept = true;
        $leave->save();
    }

    public function reject(Leave $leave)
    {
        $leave->Acceptor()->associate(auth()->user());
        $leave->accept = false;
        $leave->save();
    }
}
