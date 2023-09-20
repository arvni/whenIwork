<?php

namespace App\Repositories;

use App\Interfaces\DepartmentRepositoryInterface;
use App\Models\Department;
use Spatie\Permission\Models\Permission;

class DepartmentRepository implements DepartmentRepositoryInterface
{

    private Department $department;

    public function __construct(Department $department)
    {
        $this->department = $department;
    }

    public function list(array $queryData)
    {
        $query = $this->department->withCount("Rooms");
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }

    public function listForCombo(array $queryData)
    {
        $query = $this->department->select(["id", "name"]);
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }

    public function create(array $departmentData)
    {
        $department = $this->department->create($departmentData);
        $this->createPermissions($department);
        return $department;

    }

    public function show(Department $department, array $queryData)
    {
        $department->rooms = $this->loadRooms($department, $queryData);
        return $department;
    }

    private function loadRooms(Department $department, array $queryData)
    {
        $query = $department->Rooms()->withCount("Shifts");
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }

    public function edit(Department $department, $departmentNewData)
    {
        return $department->update($departmentNewData);

    }

    public function delete(Department $department): bool
    {
        if ($department->Rooms()->count() < 1)
            return $department->delete();
        return false;
    }

    private function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->where("name", "like", "%" . $filters["search"] . "%");
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

    public function roomList(array $queryData)
    {
        // TODO: Implement roomList() method.
    }

    private function createPermissions(Department $department)
    {
        Permission::findOrCreate("admin.Department.$department->id");
    }

    public function findById($id)
    {
        return $this->department->find($id);
    }

}
