<?php

namespace App\Http\Controllers;

use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ShiftPublisherController extends Controller
{
    private ShiftRepositoryInterface $sihftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->sihftRepository = $shiftRepository;
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
        $this->authorize($shift);
        $this->sihftRepository->publish($shift);
        return $this->responseWithSuccess(__("messages.shiftPublished"));
    }
}
