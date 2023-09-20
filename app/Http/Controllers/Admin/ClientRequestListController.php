<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\ClientRequestRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ClientRequestListController extends Controller
{
    protected ClientRequestRepositoryInterface $clientRequestRepository;

    public function __construct(ClientRequestRepositoryInterface $clientRequestRepository)
    {
        $this->clientRequestRepository = $clientRequestRepository;
        $this->middleware("indexProvider");
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return Response
     */
    public function __invoke(Request $request)
    {
        $defaultValues = $request->all();
        $clientRequests = $this->clientRequestRepository->adminList($defaultValues);
        return Inertia::render("Admin/ClientRequest/Index", compact("clientRequests", "defaultValues"));
    }
}
