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
        $query = $this->department->newQuery()->withCount("Rooms");
        if (isset($queryData["filters"]))
            $this->applyFilters($query, $queryData["filters"]);
        if (isset($queryData["sort"]))
            $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query, $queryData["pageSize"] ?? 100);
    }


    public function listMapviewDepartments(array $queryData)
    {
        $query = $this->department->newQuery();
        $this->applyPermissionLimits($query);
        if (isset($queryData["filters"]))
            $this->applyFilters($query, $queryData["filters"]);
        if (isset($queryData["sort"]))
            $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query, $queryData["pageSize"] ?? 100);
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
        $this->createPermissions($department);
        return $department->update($departmentNewData);
    }

    public function delete(Department $department): bool
    {
        if ($department->Rooms()->count() < 1) {
            Permission::where("name", "admin.Department.$department->id")->delete();
            Permission::where("name", "admin.MapView.$department->id")->delete();
            return $department->delete();
        }
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
        Permission::findOrCreate("admin.MapView.$department->id");
    }

    public function findById($id)
    {
        return $this->department->find($id);
    }

    private function applyPermissionLimits($query)
    {

        $ids = auth()->user()->getAllPermissions()
            ->filter(fn ($value) =>preg_match('/^admin\\.MapView\\.\\d+/',$value->name))
            ->map(fn($item) => $item->name)
            ->map(function ($item) {
                list($_, $__, $id) = explode(".", $item);
                return (int)$id;
            })
            ->toArray();
        return $query->whereIn("id", [...$ids]);
    }

}
