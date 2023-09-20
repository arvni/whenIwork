<?php

namespace App\Http\Requests;

use App\Models\ClientRequest;
use App\Models\Room;
use App\Rules\TimeCheck;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Request;
use Illuminate\Validation\Rule;

class ClientRequestStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return $this->get("type") === "takeLeave" || Gate::allows("create", [ClientRequest::class, Room::find(optional($this->get("requestable"))["room"]["id"])]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            "requestable.id" => "excludeIf:type,takeLeave|required|exists:shifts,id",
            "type" => "required|in:changeUser,takeLeave,shift",
            "requestable.date" => ["excludeIf:requestable.type,daily", "requiredIf:type,takeLeave"],
            "requestable.range" => ["excludeIf:requestable.type,hourly", "requiredIf:type,takeLeave", "array"],
            "requestable.range.from" => ["excludeIf:requestable.type,daily", "requiredIf:type,takeLeave", new TimeCheck("gt", "to")],
            "requestable.range.to" => ["excludeIf:requestable.type,daily", "requiredIf:type,takeLeave", new TimeCheck("lt", "from")],
        ];
    }
}
