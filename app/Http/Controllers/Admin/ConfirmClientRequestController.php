<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\ClientRequestRepositoryInterface;
use App\Models\ClientRequest;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ConfirmClientRequestController extends Controller
{
    protected ClientRequestRepositoryInterface $clientRequestRepository;

    public function __construct(ClientRequestRepositoryInterface $clientRequestRepository)
    {
        $this->clientRequestRepository = $clientRequestRepository;
    }

    /**
     * Handle the incoming request.
     *
     * @param ClientRequest $clientRequest
     * @param Request $request
     * @return RedirectResponse|Response
     * @throws AuthorizationException
     */
    public function __invoke(ClientRequest $clientRequest, Request $request)
    {
        $this->authorize("confirm", $clientRequest);
        $this->clientRequestRepository->adminConfirm($clientRequest);
        return $this->responseWithSuccess(__("messages.SuccessConfirmClientRequest"));
    }
}
