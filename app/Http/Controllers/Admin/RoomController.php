<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoomUpdateRequest;
use App\Http\Requests\RoomStoreRequest;
use App\Interfaces\DepartmentRepositoryInterface;
use App\Interfaces\RoomRepositoryInterface;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomController extends Controller
{
    private DepartmentRepositoryInterface $departmentRepository;
    private RoomRepositoryInterface $roomRepository;

    public function __construct(DepartmentRepositoryInterface $departmentRepository, RoomRepositoryInterface $roomRepository)
    {
        $this->departmentRepository = $departmentRepository;
        $this->roomRepository = $roomRepository;
        $this->middleware("indexProvider")->only("index");
        $this->middleware("prepareShiftDateFilter")->only("show");
    }

    public function index(Request $request)
    {
        $defaultValues=$request->all();
        $rooms = $this->roomRepository->list($defaultValues);
        return Inertia::render("Admin/Room/Index", compact("rooms","defaultValues"));
    }

    public function store(RoomStoreRequest $request)
    {
        $room = $this->roomRepository->create($request->all());
        return $this->responseWithSuccess(__("messages.successCreated", ['title' => $room->name]));
    }

    public function show(Room $room, Request $request)
    {
        $this->authorize("view",$room );

        $week = fn() => $this->roomRepository->shiftList($room, $request->all());
        $room = fn() => $this->roomRepository->show($room);

        return Inertia::render("Admin/Room/Show", compact("room", "week", ));
    }

    public function update(Room $room, RoomUpdateRequest $request)
    {
        $this->roomRepository->edit($room, $request->all());
        return $this->responseWithSuccess(__("messages.successUpdated", ["title" => $room->name]));
    }

    public function destroy(Room $room)
    {
        $title = $room->name;
        if ($this->roomRepository->delete($room))
            return $this->responseWithSuccess(__("messages.successDeleted", ["title" => $title]));
        return $this->responseWithError(__("messages.unsuccessfulDeleted", ["title" => $title]));
    }

}
