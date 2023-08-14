<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Http\Request;

class AccessException extends Exception
{
    public function __construct(string $message)
    {
        $this->message = $message;
    }

    public function render(Request $request)
    {
        dd($this->message);
        return redirect()->back()->withErrors("", "");
    }
}
