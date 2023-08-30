<?php

namespace App\Http\Controllers;

use App\Http\Requests\ClientRequestStoreRequest;
use App\Http\Requests\ClientRequestUpdateRequest;
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
        $defaultValues = $request->all();
        $clientRequests = $this->clientRequestRepository->list($defaultValues);
        return Inertia::render("ClientRequest/Index", compact("clientRequests", "defaultValues"));
    }

    public function store(ClientRequestStoreRequest $request)
    {
        $this->authorize("create", [ClientRequest::class, Room::find(optional($request->get("requestable"))["room"]["id"])]);
        $this->clientRequestRepository->create($request->all());
        return $this->responseWithSuccess(__("messages.successAdded", ["title" => "درخواست"]));
    }

    public function update(ClientRequest $clientRequest, ClientRequestUpdateRequest $request)
    {
        $this->clientRequestRepository->edit($clientRequest, $request->all());
        return $this->responseWithSuccess(__("messages.successfullyUpdated", ["title" => "درخواست"]));
    }

    public function confirm(ClientRequest $clientRequest)
    {
        $this->clientRequestRepository->confirm($clientRequest);
        return $this->responseWithSuccess(__("messages.successfullyUpdated", ["title" => "درخواست"]));
    }

    public function reject(ClientRequest $clientRequest, Request $request)
    {
        $this->clientRequestRepository->reject($clientRequest, $request->all());
        return $this->responseWithSuccess(__("messages.successfullyUpdated", ["title" => "درخواست"]));
    }
}
