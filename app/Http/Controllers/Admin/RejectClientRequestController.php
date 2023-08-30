<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Interfaces\ClientRequestRepositoryInterface;
use App\Models\ClientRequest;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RejectClientRequestController extends Controller
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
    public function __invoke(ClientRequest $clientRequest,Request $request)
    {

        $this->authorize("confirm", $clientRequest);
        $this->clientRequestRepository->adminReject($clientRequest,$request->all());
        return $this->responseWithSuccess(__("messages.SuccessConfirmClientRequest"));
    }
}
