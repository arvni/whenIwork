<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
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
        return Inertia::render("Admin/Dashboard");
    }
}
