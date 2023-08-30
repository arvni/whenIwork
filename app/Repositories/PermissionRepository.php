<?php

namespace App\Repositories;

use App\Interfaces\PermissionRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Permission;

class PermissionRepository implements PermissionRepositoryInterface
{

    private Permission $permission;

    public function __construct(Permission $permission)
    {
        $this->permission = $permission;
    }

    public function list(array $queryData)
    {
        $query = $this->permission->with("Roles");
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query, $queryData["pageSize"]);
    }

    public function create(array $permissionData)
    {
        return $this->permission->create($permissionData);
    }

    public function show(Permission $permission)
    {
        return $permission;
    }

    public function edit(Permission $permission, $permissionNewData)
    {
        $permission->update($permissionNewData);
    }

    public function delete(Permission $permission)
    {
        if ($permission->roles()->count() < 1)
            $permission->delete();
    }

    private function applyFilters($query, $filters)
    {
        if (isset($filters["search"])) {
            $query->where("name", "like", "%" . $filters["search"] . "%")
                ->orWhere("permissionId", "like", "%" . $filters["search"] . "%");
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

    public function findOrCreateByName(string $name)
    {
        return $this->permission->findOrCreate($name);
    }
}
