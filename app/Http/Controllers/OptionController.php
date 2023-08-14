<?php

namespace App\Http\Controllers;

use App\Http\Resources\OptionResource;
use App\Models\Option;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Inertia\Inertia;
use Inertia\Response;

class OptionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse|AnonymousResourceCollection|Response
     */
    public function index(Request $request)
    {
        $user = auth()->user();

        if ($user && !$user->can('Option List'))
            return redirect()->back()->withErrors("You dont have permission to Access this");


        $inputs = [
            "filterModel" => ["search" => $request["filterModel"]["search"] ?? ""],
            "page" => $request["page"] ?? 10,
            "sort" => ["field" => $request["sort"]["field"] ?? "id", "sort" => $request["sort"]["sort"] ?? "asc"],
            "pageSize" => $request["pageSize"] ?? 10
        ];
        $query = new Option();
        $query->where("name", "like", "%" . $inputs["filterModel"]["search"] . "%");
        $query->orderBy($inputs["sort"]["field"], $inputs["sort"]["sort"]);
        $options = fn() => $query->paginate($inputs["pageSize"]);
        $data = ["options" => $options];
        if ($request->session()->get('success'))
            $data["success"] = $request->session()->get('success');
        if ($request->session()->get('status'))
            $data["status"] = $request->session()->get('status');
        return Inertia::render('Option/Index', $data);
    }


    /**
     * Display the specified resource.
     *
     * @param Option $option
     * @return OptionResource|JsonResponse
     */
    public function show(Option $option): JsonResponse|OptionResource
    {

        $user = auth()->user();
        if ($user->can("Option Update")) {
            return new OptionResource($option);
        }
        return response()->json(["success" => false, "message" => "شما اجازه دسترسی به این بخش راندارید"], 403);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Option $option
     * @return JsonResponse|RedirectResponse
     */
    public function update(Request $request, Option $option)
    {
        $user = auth()->user();
        if ($user->can("Option Update")) {
            $option->update(["value" => $request["value"]]);
            return redirect()->back()->with(["success" => true, "status" => "با موفقیت بروز رسانی شد"]);
        }
        return redirect()->back()->withErrors("شما اجازه دسترسی به این بخش راندارید");
    }
}
