<?php

namespace App\Http\Requests;

use App\Interfaces\RoomRepositoryInterface;
use App\Repositories\RoomRepository;
use App\Rules\CheckShiftRelated;
use App\Rules\CheckUserShiftCreate;
use App\Rules\TimeCheck;
use Carbon\Carbon;
use Closure;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ShiftStoreRequest extends FormRequest
{

    private $roomRepository;

    public function __construct(RoomRepositoryInterface $roomRepository)
    {
        $this->roomRepository = $roomRepository;
    }

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $room = $this->roomRepository->findById($this->get("room")["id"]);
        if (!$room)
            return false;

        return auth()->user()->can("admin.Department.$room->department_id.Room.$room->id");
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "room.id" => ["required", "exists:rooms,id", new CheckUserShiftCreate],
            "date" => ["required", "date", "after_or_equal:today"],
            "started_at" => ["required", new TimeCheck("lt", "ended_at")],
            "ended_at" => ["required", new TimeCheck("gt", "started_at")],
            "type" => ["required", "in:normal,open"],
            "noUsers" => ["required", "min:1"],
            "related.id" => "excludeIf:type,open|required|exists:users,id",
            "related.*.id" => "exclude:type,normal|required|exists:roles,id"
        ];
    }
}
