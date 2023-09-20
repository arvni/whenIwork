<?php


namespace App\Interfaces;


use App\Models\ClientRequest;
use App\Models\Shift;
use App\Models\User;

interface ShiftRepositoryInterface extends RepositoryInterface
{
    public function list(array $queryData);

    public function listAllowed(array $queryData);

    public function create(array $shiftData);

    public function show(Shift $shift);

    public function edit(Shift $shift, $shiftNewData);

    public function delete(Shift $shift);

    public function requestsList(Shift $shift, array $queryData);

    public function findById($id);

    public function changeUser(Shift $shift, ClientRequest $clientRequest);

    public function acceptOpenShift(Shift $shift, ClientRequest $clientRequest);

    public function publish(Shift $shift);

}
