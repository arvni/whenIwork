<?php

namespace App\Http\Requests;

use App\Rules\ConfirmClientRequestRule;
use Closure;
use Illuminate\Foundation\Http\FormRequest;

class ClientRequestConfirmRequest extends FormRequest
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
            "requestable" => ["required",new ConfirmClientRequestRule()]
        ];
    }
}
