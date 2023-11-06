<?php

namespace App\Http\Controllers;

use App\Services\CalculateUserHours;
use App\Services\CalendarService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected CalendarService $calendarService;
    protected CalculateUserHours $calculateUserHours;

    public function __construct(CalendarService $calendarService, CalculateUserHours $calculateUserHours)
    {
        $this->calendarService = $calendarService;
        $this->calculateUserHours = $calculateUserHours;
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return RedirectResponse|\Illuminate\Http\Response|Response
     */
    public function __invoke(Request $request)
    {
        $shifts = $this->calendarService->listShifts($request->get("date", null));
        $leaves = $this->calendarService->listLeaves($request->get("date", null));

        $sumShifts = $this->calculateUserHours->calculateSumOfShiftsHours(auth()->user()->id, $request->get("date", null));
        $sumLeaves = $this->calculateUserHours->calculateSumOfLeavesHours(auth()->user()->id, $request->get("date", null));
        return Inertia::render("Dashboard", ["events" => array_merge($shifts, $leaves), "sumShifts" => $sumShifts, "sumLeaves" => $sumLeaves,"defaults"=>$request->all()]);
    }
}
