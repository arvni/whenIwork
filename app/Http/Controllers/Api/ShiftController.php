<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Api\ShiftResource;
use App\Http\Resources\APIResource;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;
use Illuminate\Http\Request;

class ShiftController extends Controller
{
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftRepository = $shiftRepository;
    }

    public function show(Shift $shift)
    {
        return new ShiftResource($this->shiftRepository->show($shift));
    }


}
