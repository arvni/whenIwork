<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function __invoke(Request $request)
    {
        if(auth()->user())
            return redirect()->route("dashboard");

        return Inertia::render('Welcome', [
            'captchaSrc' => captcha_src('flat'),
        ]);
    }
}
