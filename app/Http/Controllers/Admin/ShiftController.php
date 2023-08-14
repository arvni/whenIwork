<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\ShiftStoreRequest;
use App\Http\Requests\ShiftUpdateRequest;
use App\Interfaces\ShiftRepositoryInterface;
use App\Models\Shift;

class ShiftController extends Controller
{
    private ShiftRepositoryInterface $shiftRepository;

    public function __construct(ShiftRepositoryInterface $shiftRepository)
    {
        $this->shiftRepository = $shiftRepository;
    }

    public function store(ShiftStoreRequest $request)
    {
        $this->shiftRepository->create($request->all());
        return $this->responseWithSuccess(__("messages.successCreated", ["title" => "شیفت"]));
    }

    public function update(Shift $shift, ShiftUpdateRequest $request)
    {
        $this->shiftRepository->edit($shift, $request->all());
        return $this->responseWithSuccess(__("messages.successUpdated", ["title" => "شیفت"]));
    }

    public function destroy(Shift $shift)
    {
        if ($this->shiftRepository->delete($shift)) {
            return $this->responseWithSuccess(__("messages.successfulDeleted", ["title" => "شیفت $shift->started_at "]));
        } else
            return $this->responseWithError(__("messages.unsuccessfulDeleted", ["title" => "شیفت $shift->started_at "]));
    }

}
