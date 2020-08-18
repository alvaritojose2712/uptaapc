<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class Profesor
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!session()->has('role')) {
            return redirect()->route("login");
        }
        
        if (session('role') == 1) {
            return redirect()->route("admin");
        }
        if (session('role') == 2) {
            return $next($request);
        }
        if (session('role') == 3) {
            return redirect()->route("estudiante");
        }
    }
}
