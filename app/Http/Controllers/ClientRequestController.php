<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequestStoreRequest;
use App\Interfaces\ClientRequestRepositoryInterface;
use App\Models\ClientRequest;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientRequestController extends Controller
{
    private ClientRequestRepositoryInterface $clientRequestRepository;

    public function __construct(ClientRequestRepositoryInterface $clientRequestRepository)
    {
        $this->middleware(["indexProvider"])->only("index");
        $this->clientRequestRepository = $clientRequestRepository;
    }

    public function index(Request $request)
    {
        $clientRequests = $this->clientRequestRepository->list($request->all());
        return Inertia::render("ClientRequest/Index", compact("clientRequests"));
    }

    public function store(ClientRequestStoreRequest $request)
    {

        $this->authorize("create", [ClientRequest::class, Room::find(optional($request->get("shift"))["room"]["id"])]);
        $this->clientRequestRepository->create($request->all());
        return $this->responseWithSuccess(__("messages.successAdded", ["title" => "درخواست"]));
    }
}
