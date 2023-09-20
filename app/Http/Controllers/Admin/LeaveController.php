<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\LeaveRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeaveController extends Controller
{
    private LeaveRepositoryInterface $leaveRepository;

    public function __construct(LeaveRepositoryInterface $leaveRepository)
    {
        $this->leaveRepository = $leaveRepository;
        $this->middleware("indexProvider")->only("index");
    }

    public function index(Request $request)
    {
        $requestInputs = $request->all();
        $leaves = $this->leaveRepository->list($requestInputs);
        return Inertia::render("Admin/Leave/Index", compact("requestInputs", "leaves"));
    }
}
