<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

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
        return $this->responseWithSuccess(__("messages,successfullyPublished"));
    }
}
