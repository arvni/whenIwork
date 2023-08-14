<?php


namespace App\Interfaces;


use App\Models\Room;
use App\Repositories\BaseClass;

interface RoomRepositoryInterface {
    public function list(array $queryData, string $type = "admin");

    public function create(array $roomData);

    public function show(Room $room);

    public function edit(Room $room, $roomNewData);

    public function delete(Room $room);

    public function shiftList(Room $room, array $queryData);

    public function findById($id);

    public function allowedUsersList(Room $room, array $queryData);

    public function allowedRolesList(Room $room, array $queryData);
}
