<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Resources\Json\JsonResource;

class ShiftResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "ended_at" => $this->ended_at,
            "started_at" => $this->started_at,
            "related" => $this->type == "open" ? $this->Roles : (count($this->Works) ? optional($this->Works[0])->User : null),
            "type" => $this->type,
            "date" => $this->date,
            "noUsers" => $this->noUsers,
            "room" => $this->room,
            "description" => $this->description
        ];
    }
}
