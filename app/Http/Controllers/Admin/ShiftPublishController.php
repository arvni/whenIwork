<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;
use App\Models\User;
use App\Notifications\ShiftPublished;
use App\Rules\CheckUserShiftPublish;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

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
     * @param Request $request
     * @return RedirectResponse
     * @throws AuthorizationException
     * @throws ValidationException
     */
    public function __invoke(Shift $shift, Request $request)
    {
        if ($shift->type === "normal") {
            $validator = Validator::make(["shift" => $shift], ["shift" => new CheckUserShiftPublish()]);
            $validator->validate();
        }
        $this->authorize("publish", $shift);
        $this->shiftRepository->publish($shift);
        $this->notifyUsers($shift);
        return $this->responseWithSuccess(__("messages.successfullyPublished"));
    }

    private function notifyUsers(Shift $shift)
    {
        if ($shift->type != "open") {
            $users = $shift->users;
            Notification::send($users, new ShiftPublished($shift));
        }
    }
}
