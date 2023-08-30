<?php

namespace App\Http\Requests;

use App\Models\ClientRequest;
use App\Rules\TimeCheck;
use Illuminate\Foundation\Http\FormRequest;
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
        return true;
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
            "requestable.date" => ["requiredIf:type,takeLeave"],
            "requestable.range.from" => ["requiredIf:type,takeLeave", new TimeCheck("gt", "to")],
            "requestable.range.to" => ["requiredIf:type,takeLeave", new TimeCheck("lt", "from")],
        ];
    }
}
