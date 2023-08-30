<?php

namespace App\Http\Controllers\Admin;


use App\Http\Controllers\Controller;
use App\Http\Requests\PermissionRequest;
use App\Interfaces\PermissionRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Throwable;

class PermissionController extends Controller
{
    private PermissionRepositoryInterface $permissionRepository;

    public function __construct(PermissionRepositoryInterface $permissionRepository)
    {
        $this->permissionRepository = $permissionRepository;
        $this->middleware("indexProvider")->only("index");
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function index(Request $request)
    {
        $defaultValues = $request->all();
        $permissions = $this->permissionRepository->list($defaultValues);
        return Inertia::render('Admin/Permission/Index', compact("permissions", "defaultValues"));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PermissionRequest $request
     * @return RedirectResponse
     */
    public function store(PermissionRequest $request)
    {
        $this->permissionRepository->create($request->all());
        return redirect()->back()->with(["status" => $request["name"] . " permission successfully added", "success" => true]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param PermissionRequest $request
     * @param Permission $permission
     * @return RedirectResponse
     * @throws Throwable
     */
    public function update(PermissionRequest $request, Permission $permission)
    {

        $this->permissionRepository->edit($permission, $request->all());
        return redirect()->back()->with(["status" => $request["name"] . " permission successfully added", "success" => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Permission $permission
     * @return RedirectResponse
     */
    public function destroy(Permission $permission)
    {
        $title = $permission->name;
        if (!$permission->roles()->count()) {
            $this->permissionRepository->delete($permission);
            return redirect()->back()->with(["success" => true, "status" => "permission $title successfully deleted"]);
        } else
            return redirect()->back()->withErrors(["error" => "$title permission has man roles"]);
    }
}
