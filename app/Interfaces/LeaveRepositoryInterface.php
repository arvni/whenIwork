<?php


namespace App\Interfaces;


use App\Models\Leave;
use App\Models\User;

interface LeaveRepositoryInterface extends RepositoryInterface
{
    public function list(array $queryData);

    public function listAllowed(array $queryData);

    public function create(array $leaveData);

    public function show(Leave $leave);

    public function edit(Leave $leave, $leaveNewData);

    public function delete(Leave $leave);

    public function requestsList(Leave $leave, array $queryData);

    public function findById($id);

    public function accept(Leave $leave);

    public function reject(Leave $leave);
}
