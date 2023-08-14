<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\APIResource;
use App\Interfaces\RoomRepositoryInterface;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    private $roomRepository;
    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository=$roomRepository;
    }
    public function show(Room $room)
    {
        return $this->roomRepository->show($room);
    }

    public function listUsers(Room $room, Request $request)
    {
        return APIResource::collection($this->roomRepository->allowedUsersList($room,$request->all()));
    }

    public function listRoles(Room $room, Request $request)
    {
        return APIResource::collection($this->roomRepository->allowedRolesList($room,$request->all()));
    }
}
