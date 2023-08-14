<?php


namespace App\Interfaces;


use App\Models\Department;

interface DepartmentRepositoryInterface
{
    public function list(array $queryData);

    public function listForCombo(array $queryData);

    public function create(array $departmentData);

    public function show(Department $department, array $queryData);

    public function edit(Department $department, $departmentNewData);

    public function delete(Department $department);

    public function roomList(array $queryData);

    public function findById($id);
}
