<?php

namespace App\Repositories;

use App\Interfaces\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;

class RoleRepository implements RoleRepositoryInterface
{

    private Role $role;

    public function __construct(Role $role)
    {
        $this->role = $role;
    }

    public function list(array $queryData)
    {
        $query = $this->role->withCount(['users','permissions']);
        $this->applyFilters($query, $queryData["filters"]);
        $this->applyOrderBy($query, $queryData["sort"]);
        return $this->applyPaginate($query,$queryData["pageSize"]);
    }

    public function create(array $roleData)
    {
        $role=$this->role->create($roleData);
        $role->syncPermissions($roleData["permissions"]);
        return $role;
    }

    public function show(Role $role)
    {
        return $role;
    }

    public function edit(Role $role, $roleNewData)
    {
        $role->update(["name" => $roleNewData["name"]]);
        $role->syncPermissions($roleNewData["permissions"]);
    }

    public function delete(Role $role)
    {
        if ($role->users()->count()<1)
            $role->delete();
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
}
