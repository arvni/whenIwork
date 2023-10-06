<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;
use App\Models\User;
use App\Notifications\ShiftPublished;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Notification;

class ShiftPublishController extends Controller
{
    protected ShiftRepositoryInterface $shiftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftRepository = $shiftRepository;
    }

    /**
     * Handle the incoming request.
     *
     * @param Shift $shift
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function __invoke(Shift $shift)
    {
        $this->authorize("publish", $shift);
        $this->shiftRepository->publish($shift);
        $this->notifyUsers($shift);
        return $this->responseWithSuccess(__("messages.successfullyPublished"));
    }

    private function notifyUsers(Shift $shift)
    {
        if ($shift->type == "open") {
            $roles = $shift->Roles;
            $users = collect();
            foreach ($roles as $role) {
                $users->push(User::role($role->name)->get());
            }
        } else
            $users = $shift->users;
        Notification::send($users, new ShiftPublished($shift));
    }
}
