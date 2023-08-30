<?php

namespace App\Http\Controllers;

use App\Interfaces\ClientRequestRepositoryInterface;
use App\Models\ClientRequest;

class CancelClientRequestController extends Controller
{
    private ClientRequestRepositoryInterface $clientRequestRepository;
    public function __construct(ClientRequestRepositoryInterface $clientRequestRepository)
    {
        $this->clientRequestRepository=$clientRequestRepository;
    }
    /**
     * Handle the incoming request.
     *
     * @param ClientRequest $clientRequest
     * @return \Illuminate\Http\RedirectResponse
     */
    public function __invoke(ClientRequest $clientRequest)
    {
        if ($clientRequest->status==="waiting") {
            $this->clientRequestRepository->cancel($clientRequest);
            return $this->responseWithSuccess(__("messages.success_cancel"));
        }
        return $this->responseWithError(__("messages.cannotBeCanceled"));
    }
}
