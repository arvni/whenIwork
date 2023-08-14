<?php

namespace App\Http\Controllers;

use App\Interfaces\ShiftRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientShiftListController extends Controller
{
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftRepository = $shiftRepository;
        $this->middleware("indexProvider");
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request)
    {
        $request->merge(["filters" => [
            ...$request->get("filters",[]),
            "type" => optional($request->get("filters"))["type"] ?? "open"
        ]]);
        $shifts = $this->shiftRepository->clientList($request->all());
        $defaultValues = [...$request->except(["filters", "orderBy"]),
            "filterModel" => [...$request->get("filters")],
            "sort" => $request->get("orderBy")];
        return Inertia::render("Shift/Index", compact("shifts", "defaultValues"));
    }
}
