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
            "related" => $this->type == "open" ? $this->attendances->map(function ($item) {
                return [
                    "id" => $item->attendable->id,
                    "name" => $item->attendable->id,
                    "class" => get_class($item->attendable)
                ];
            }) : [
                "id" => optional(optional($this->attendances->first())->attendable)->id,
                "name" => optional(optional($this->attendances->first())->attendable)->name,
                "class" => $this->attendances->first() ? get_class($this->attendances->first()->attendable) : null
            ],
            "type" => $this->type,
            "date" => $this->date,
            "noUsers" => $this->noUsers,
            "room" => $this->room,
            "description" => $this->description
        ];
    }
}
