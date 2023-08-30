<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientRequestResource;
use App\Interfaces\ClientRequestRepositoryInterface;
use App\Models\ClientRequest;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class ClientRequestController extends Controller
{
    protected ClientRequestRepositoryInterface $clientRequestRepository;

    public function __construct(ClientRequestRepositoryInterface $clientRequestRepository)
    {
        $this->clientRequestRepository = $clientRequestRepository;
    }

    public function show($clientRequest)
    {
        $model = $this->clientRequestRepository->show($clientRequest);
        if ($model)
            return new ClientRequestResource($model);
        throw new NotFoundHttpException();
    }
}
