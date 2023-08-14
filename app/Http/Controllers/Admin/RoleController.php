<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleRequest;
use App\Interfaces\RoleRepositoryInterface;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleController extends Controller
{
    private $roleRepository;

    public function __construct(RoleRepositoryInterface $roleRepository)
    {
        $this->roleRepository = $roleRepository;
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
        $this->authorizeForUser(auth()->user(), "admin.roles.index");
        $roles = $this->roleRepository->list($request->all());
        $defaultValues = [
            ...$request->except(["filters", "orderBy"]),
            "filterModel" => $request->get("filters"),
            "sort" => $request->get("orderBy"),
        ];
        return Inertia::render('Admin/Role/Index', compact("roles", "defaultValues"));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return RedirectResponse|Response
     */
    public function create()
    {
        $this->authorizeForUser(auth()->user(), "admin.roles.create");

        return Inertia::render('Admin/Role/Add', [
            "permissions" => $this->preparePermissions()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param RoleRequest $request
     * @return RedirectResponse
     */
    public function store(RoleRequest $request)
    {
        $this->roleRepository->create($request->all());
        return redirect()->route('admin.roles.index')->with(["status" => $request["name"] . " با موفقیت ثبت شد.", "success" => true]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Role $role
     * @return RedirectResponse|Response
     */
    public function edit(Role $role)
    {

        $this->authorizeForUser(auth()->user(), "admin.roles.edit", $role);

        $role["permissions"] = $role->permissions()->get(['id'])->map(function ($item) {
            return $item["id"];
        });
        return Inertia::render('Admin/Role/Edit', [
            "role" => $role,
            "permissions" => $this->preparePermissions()]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param RoleRequest $request
     * @param Role $role
     * @return RedirectResponse
     */
    public function update(RoleRequest $request, Role $role)
    {
        $this->roleRepository->edit($role, $request->all());
        return redirect()
            ->route('admin.roles.index')
            ->with(["status" => $request["name"] . " با موفقیت بروزرسانی شد", "success" => true]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Role $role
     * @return RedirectResponse
     */
    public function destroy(Role $role)
    {
        $title = $role["name"];
        try {
            $role->delete();
        } catch (\Exception $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
        return redirect()->back()->with(["status" => "$title با موفقیت حذف شد", "success" => true]);
    }

    private function preparePermissions()
    {
        return Permission::all(['name', 'id'])
            ->map(function ($item) {
                $sections = explode(".", $item->name);
                list($section, $parentClass, $parentId, $class, $id) = optional($sections);
                $name = __("permissions.$item->name");
                if ($parentClass && $class)
                    $name = __("constants.$section") . " " . __("constants.$parentClass") . " " . ("App\Models\\$parentClass")::find($parentId)->name . " " . __("constants.$class") . " " . ("App\Models\\$class")::find($id)->name;
                elseif ($parentClass && $parentId && class_exists("App\Models\\$parentClass")) {
                    $name = __("constants.$section") . " " . __("constants.$parentClass") . " " . ("App\Models\\$parentClass")::find($parentId)->name;
                }
                return [
                    "name" => $name,
                    "id" => $item->id,
                    "key" => $item->name,
                    "section" => __("constants.$section"),
                    "subSection" => __("constants.$parentClass"),
                    "lastGroup" => $parentId
                ];
            })->groupBy("section")->map(function ($item) {
                return $item->groupBy("subSection");
            });
    }
}
