<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     *
     * @param Request $request
     * @return RedirectResponse
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'userId' => [Rule::requiredIf(fn() => auth()->user()->can("user.password.change") && !isset($request["current"]))],
            'current' => [Rule::excludeIf(fn() => auth()->user()->can("user.password.change")), 'required', 'current_password'],
            'password' => ['required', Password::defaults()->mixedCase()->numbers()->symbols(), 'confirmed'],
        ]);

        if ($request->user()->can("user.changePassword") && isset($request["userId"]))
            $user = User::find($request->get("userId"));
        else
            $user = auth()->user();
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with(["success" => true, "status" => "Password Successfully Updated"]);
    }
}
