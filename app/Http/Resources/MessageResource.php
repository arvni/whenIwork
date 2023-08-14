<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable;

class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param Request $request
     * @return array|Arrayable|JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id"=>$this->id,
            "sender" => ["name" => $this->Sender->name],
            "title" => $this->title,
            "context" => $this->context,
            "receivers" => $this->Receivers->map(function ($receiver) {
                return ["id" => $receiver->userId, "name" => $receiver->name,"read_at"=>$receiver->pivot->read_at];
            })
        ];
    }
}
