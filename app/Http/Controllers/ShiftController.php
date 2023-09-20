<?php

namespace App\Http\Controllers;

use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Inertia\Inertia;

class ShiftController extends Controller
{
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftRepository = $shiftRepository;
        $this->middleware("indexProvider")->only("index");
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $defaultValues = $request->all();
        $shifts = $this->shiftRepository->listAllowed($defaultValues);
        return Inertia::render("Shift/Index", compact("shifts", "defaultValues"));
    }

}
