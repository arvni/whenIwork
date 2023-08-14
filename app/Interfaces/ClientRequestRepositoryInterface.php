<?php


namespace App\Interfaces;


use App\Models\ClientRequest;

interface ClientRequestRepositoryInterface
{
    public function list(array $queryData);

    public function create(array $roomData);

    public function show(ClientRequest $room);

    public function edit(ClientRequest $room, $roomNewData);

    public function delete(ClientRequest $room);

}
