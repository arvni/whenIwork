<?php

namespace App\Http\Controllers;

use App\Models\Option;
use Inertia\Inertia;

class PageController extends Controller
{
    public function consent()
    {
        $user=auth()->user();
        $consent=Option::where("key","consent")->select("key","value")->first();
        return Inertia::render("User/Consent",["consent"=>$consent["value"],"disabled"=>$user->consent]);
    }

    public function guidance()
    {
        $guidance=Option::where("key","guidanceFile")->select("key","value")->first();
        return Inertia::render("Guidance",["guidance"=>$guidance["value"]]);
    }
}
