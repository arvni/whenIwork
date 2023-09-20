<?php

namespace App\Policies;

use App\Models\ClientRequest;
use App\Models\Room;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;
use Illuminate\Support\Facades\Gate;

class ClientRequestPolicy
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
        //
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param User $user
     * @param ClientRequest $clientRequest
     * @return Response|bool
     */
    public function view(User $user, ClientRequest $clientRequest)
    {
        //
    }

    /**
     * Determine whether the user can create models.
     *
     * @param User $user
     * @param Room $room
     * @return Response|bool
     */
    public function create(User $user, Room $room)
    {
            return $user->hasAnyPermission([
                "client.Department.$room->department_id.Room.$room->id",
                "admin.Department.$room->department_id.Room.$room->id",
                "admin.Department.$room->department_id",
            ]);
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param User $user
     * @param ClientRequest $clientRequest
     * @return Response|bool
     */
    public function update(User $user, ClientRequest $clientRequest)
    {
        //
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param User $user
     * @param ClientRequest $clientRequest
     * @return Response|bool
     */
    public function delete(User $user, ClientRequest $clientRequest)
    {
        //
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param User $user
     * @param ClientRequest $clientRequest
     * @return Response|bool
     */
    public function restore(User $user, ClientRequest $clientRequest)
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param User $user
     * @param ClientRequest $clientRequest
     * @return Response|bool
     */
    public function forceDelete(User $user, ClientRequest $clientRequest)
    {
        //
    }

    public function reject(User $user, ClientRequest $clientRequest)
    {
        if ($clientRequest->type === "takeLeave")
            return $user->can("admin.users.leaves");
        else {
            $room = $clientRequest->requestable->Room;
            return $user->can("admin.Department.$room->department_id.Room.$room->id");
        }
    }

    public function confirm(User $user, ClientRequest $clientRequest)
    {
        if ($clientRequest->type === "takeLeave")
            return $user->can("admin.users.leaves");
        else {
            $room = $clientRequest->requestable->Room;
            return $user->can("admin.Department.$room->department_id.Room.$room->id");
        }

    }
}
