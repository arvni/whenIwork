<?php

namespace App\Policies;

use App\Models\Shift;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\Gate;

class ShiftPolicy
{
    use HandlesAuthorization;

    public function publish(User $user, Shift $shift)
    {
        return Gate::allows("view", $shift->Room);
    }
}
