<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\APIResource;
use App\Interfaces\RoomRepositoryInterface;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class RoomListController extends Controller
{
    private RoomRepositoryInterface $roomRepository;

    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository=$roomRepository;
        $this->middleware(["indexProvider","prepareListRequest"]);
    }
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return AnonymousResourceCollection
     */
    public function __invoke(Request $request)
    {
        $rooms=$this->roomRepository->listAllowed($request->all());
        return APIResource::collection($rooms);
    }
}
