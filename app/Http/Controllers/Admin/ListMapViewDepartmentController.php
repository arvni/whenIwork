<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\DepartmentRepositoryInterface;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class ListMapViewDepartmentController extends Controller
{
    private DepartmentRepositoryInterface $departmentRepository;

    public function __construct(DepartmentRepositoryInterface $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
        $this->middleware("indexProvider")->only(["index", "show"]);
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return \Inertia\Response
     * @throws AuthorizationException
     */
    public function __invoke(Request $request)
    {
        if (!auth()->user()->can("admin.departments.mapView"))
            abort(403);
        $defaultValues = $request->all();
        $departments = $this->departmentRepository->listMapviewDepartments($defaultValues);
        return Inertia::render("Admin/Department/MapViewIndex", compact("departments", "defaultValues"));
    }
}
