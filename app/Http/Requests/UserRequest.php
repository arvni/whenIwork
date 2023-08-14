<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Request;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @param Request $request
     * @return bool
     */
    public function authorize(Request $request)
    {
        return auth()->user()->can('admin.users.create');
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
            "userId" => "required|unique:users,userId",
            'email' => [
                "required",
                "email:rfc,dns",
                "unique:users,email"
            ],
            'avatar' => "image|max:2048|nullable",
            'password' => "required|min:6|confirmed",
            'roles.*.id' => 'required|exists:roles,id'
        ];
    }
}
