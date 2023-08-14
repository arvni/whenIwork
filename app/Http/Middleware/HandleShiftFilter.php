<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Morilog\Jalali\Jalalian;

class HandleShiftFilter
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return Response|RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $request->merge(["filters" => ["date" => $request->get("date", [
            $this->getStartOfWeek(),
            $this->getEndOfWeek()
        ])]]);

        return $next($request);
    }

    private function getStartOfWeek()
    {
        return Jalalian::now()->subDays(Jalalian::now()->getDayOfWeek())->toCarbon()->format("Y-m-d");
    }

    private function getEndOfWeek()
    {
        return Jalalian::now()->addDays(6-Jalalian::now()->getDayOfWeek())->toCarbon()->format("Y-m-d");
    }
}
