<?php


namespace App\Interfaces;


use App\Models\ClientRequest;
use App\Models\Shift;
use App\Models\Work;

interface WorkRepositoryInterface
{
    public function list(array $queryData);

    public function listAll(array $queryData);

    public function create(array $workData);

    public function show(Work $work);

    public function edit(Work $work, $workNewData);

    public function delete(Work $work);

    public function requestsList(Work $work, array $queryData);

    public function findById($id);

    public function changeUser(Work $work,$userId);

}
