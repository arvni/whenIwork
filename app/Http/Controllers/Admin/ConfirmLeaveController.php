<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\LeaveRepositoryInterface;
use App\Models\Leave;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConfirmLeaveController extends Controller
{

    protected LeaveRepositoryInterface $leaveRepository;

    public function __construct(LeaveRepositoryInterface $leaveRepository)
    {
        $this->leaveRepository = $leaveRepository;
    }

    /**
     * Handle the incoming request.
     *
     * @param Leave $leave
     * @return RedirectResponse
     * @throws AuthorizationException
     */
    public function __invoke(Leave $leave)
    {
        $this->authorize("accept", $leave);
        $this->leaveRepository->accept($leave);
        return $this->responseWithSuccess(__("messages.successfullyAccepted", ["title" => "مرخصی"]));
    }
}
