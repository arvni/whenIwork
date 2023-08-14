<?php


namespace App\Interfaces;


use App\Models\Shift;

interface ShiftRepositoryInterface
{
    public function list(array $queryData);

    public function clientList(array $queryData);

    public function create(array $shiftData);

    public function show(Shift $shift);

    public function edit(Shift $shift, $shiftNewData);

    public function delete(Shift $shift);

    public function requestsList(Shift $shift,array $queryData);

    public function findById($id);
}
