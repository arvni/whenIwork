<?php


namespace App\Interfaces;


use Spatie\Permission\Models\Permission;

interface PermissionRepositoryInterface
{
    public function list(array $queryData);

    public function create(array $permissionData);

    public function show(Permission $permission);

    public function edit(Permission $permission, $permissionNewData);

    public function delete(Permission $permission);
}
