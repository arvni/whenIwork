<?php


namespace App\Interfaces;


use App\Models\ClientRequest;

interface ClientRequestRepositoryInterface
{
    public function list(array $queryData);

    public function create(array $roomData);

    public function show($room);

    public function edit(ClientRequest $room, $roomNewData);

    public function delete(ClientRequest $room);

    public function cancel(ClientRequest $clientRequest);

    public function confirm(ClientRequest $clientRequest);

    public function adminConfirm(ClientRequest $clientRequest);

    public function reject(ClientRequest $clientRequest, $requestDetails);

    public function adminReject(ClientRequest $clientRequest, $requestDetails);

}
