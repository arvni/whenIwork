<?php

namespace App\Http\Controllers;

use App\Services\CalendarService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    protected CalendarService $calendarService;

    public function __construct(CalendarService $calendarService)
    {
        $this->calendarService = $calendarService;
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
        return Inertia::render("Dashboard", ["events" => $shifts]);
    }
}
