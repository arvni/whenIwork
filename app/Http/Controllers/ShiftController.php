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
    }

    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $shifts = $this->shiftRepository->list($request->all());
        return Inertia::render("Shift/Index", compact("shifts"));
    }

}
