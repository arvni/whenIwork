<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\DepartmentRepositoryInterface;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    private DepartmentRepositoryInterface $departmentRepository;

    public function __construct(DepartmentRepositoryInterface $departmentRepository)
    {
        $this->departmentRepository = $departmentRepository;
        $this->middleware("indexProvider")->only(["index", "show"]);
    }

    public function index(Request $request)
    {
        $this->authorizeForUser(auth()->user(), "admin.departments.index");
        $departments = $this->departmentRepository->list($request->all());
        $defaultValues = [...$request->except(["filters", "orderBy"]), "filterModel" => $request->get("filters"), "sort" => $request->get("orderBy")];
        return Inertia::render("Admin/Department/Index", compact("departments", "defaultValues"));
    }

    public function store(Request $request)
    {
        $department = $this->departmentRepository->create($request->all());
        return $this->responseWithSuccess(__("messages.successAdded", ['title' => $department->name]));
    }

    public function show(Department $department, Request $request)
    {
        $this->authorizeForUser(auth()->user(), "admin.Department.$department->id");
        $department = $this->departmentRepository->show($department, $request->all());
        $defaultValues = [...$request->except(["filters", "orderBy"]), "filterModel" => $request->get("filters"), "sort" => $request->get("orderBy")];
        return Inertia::render("Admin/Department/Show", compact("department","defaultValues"));
    }

    public function update(Department $department, Request $request)
    {
        $this->departmentRepository->edit($department, $request->all());
        return $this->responseWithSuccess(__("messages.successUpdated", ['title' => $department->name]));
    }

    public function destroy(Department $department)
    {
        $title = $department->name;
        if ($this->departmentRepository->delete($department))
            return $this->responseWithSuccess(__("messages.successfulDeleted", ["title" => $title]));
        return $this->responseWithError(__("messages.unsuccessfulDeleted"));
    }
}
