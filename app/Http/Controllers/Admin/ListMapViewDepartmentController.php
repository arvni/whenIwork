<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\DepartmentRepositoryInterface;
use App\Models\Department;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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
     * @return Response
     */
    public function __invoke(Request $request)
    {
        $this->authorize("listMapView",Department::class);
        $defaultValues = $request->all();
        $departments = $this->departmentRepository->listMapviewDepartments($defaultValues);
        return Inertia::render("Admin/Department/MapViewIndex", compact("departments", "defaultValues"));
    }
}
