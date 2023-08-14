<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class IndexRequestProvider
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
        $inputs["filters"] = $request->get("filterModel", []);
        $inputs["page"] = $request->get("page", 1);
        $inputs["orderBy"] = $request->get("sort",["field" => "id", "sort" =>  "desc"]);
        $inputs["pageSize"] = $request->get("pageSize", 10);
        $request->replace($inputs);
        return $next($request);
    }
}
