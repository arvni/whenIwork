<?php


namespace App\Interfaces;



use Spatie\Permission\Models\Role;

interface RoleRepositoryInterface
{
    public function list(array $queryData);

    public function create(array $roleData);

    public function show(Role $role);

    public function edit(Role $role, $roleNewData);

    public function delete(Role $role);
}
