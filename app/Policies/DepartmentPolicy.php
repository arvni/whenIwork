<?php

namespace App\Policies;

use App\Models\Department;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DepartmentPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function viewAny(User $user)
    {
        return $user->can("admin.departments.index");
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param Department $department
     * @return Response|bool
     */
    public function view(User $user, Department $department)
    {
        return $user->can( "admin.Department.$department->id");
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @return Response|bool
     */
    public function create(User $user)
    {
        return $user->can( "admin.departments.create");
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param Department $department
     * @return Response|bool
     */
    public function update(User $user, Department $department)
    {
        return $user->can( "admin.departments.edit");
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param Department $department
     * @return Response|bool
     */
    public function delete(User $user, Department $department)
    {
        return $user->can( "admin.departments.delete");
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param User $user
     * @param Department $department
     * @return Response|bool
     */
    public function restore(User $user, Department $department)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param User $user
     * @param Department $department
     * @return Response|bool
     */
    public function forceDelete(User $user, Department $department)
    {
        //
    }
}
