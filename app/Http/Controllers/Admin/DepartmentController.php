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
        $this->authorize("viewAny",Department::class);
        $defaultValues =$request->all();
        $departments = $this->departmentRepository->list($defaultValues);
        return Inertia::render("Admin/Department/Index", compact("departments", "defaultValues"));
    }

    public function store(Request $request)
    {
        $this->authorize("create",Department::class);
        $department = $this->departmentRepository->create($request->all());
        return $this->responseWithSuccess(__("messages.successAdded", ['title' => $department->name]));
    }

    public function show(Department $department, Request $request)
    {
        $this->authorize("update",$department);
        $defaultValues =$request->all();
        $department = $this->departmentRepository->show($department, $defaultValues);
        return Inertia::render("Admin/Department/Show", compact("department","defaultValues"));
    }

    public function update(Department $department, Request $request)
    {
        $this->authorize("update",$department);
        $this->departmentRepository->edit($department, $request->all());
        return $this->responseWithSuccess(__("messages.successUpdated", ['title' => $department->name]));
    }

    public function destroy(Department $department)
    {
        $this->authorize("delete",$department);
        $title = $department->name;
        if ($this->departmentRepository->delete($department))
            return $this->responseWithSuccess(__("messages.successfulDeleted", ["title" => $title]));
        return $this->responseWithError(__("messages.unsuccessfulDeleted"));
    }
}
