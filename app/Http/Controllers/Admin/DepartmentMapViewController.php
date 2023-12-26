<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Services\DepartmentEvents;
use Carbon\Carbon;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentMapViewController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Department $department
     * @param Request $request
     * @return Response
     * @throws AuthorizationException
     */
    public function __invoke(Department $department, Request $request): Response
    {
        $this->authorize("mapView",$department);
        $rooms = (new DepartmentEvents)($department, $request->get("date"));
        $defaultValues = ["date" => $request->get("date", Carbon::now("Asia/Tehran")->format("Y-m-d"))];
        return Inertia::render("Admin/Department/MapView", compact("department", "defaultValues", "rooms"));
    }
}
