<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->user()->can('admin.users.edit');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => "required",
            "userId" => "required|unique:users,userId," . $this->route()->parameter("user")->id,
            'email' => [
                "required",
                "email:rfc,dns",
                "unique:users,email," . $this->route()->parameter("user")->id
            ],
            'avatar' => "image|max:2048|nullable",
            'role.id' => 'required|exists:roles,id'
        ];
    }
}
