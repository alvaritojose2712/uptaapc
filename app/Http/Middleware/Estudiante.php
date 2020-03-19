<?php

namespace App\Http\Middleware;

use Closure;
use Auth;

class Estudiante
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
        if (!Auth::check()) {
            return redirect()->route("login");
        }
        
        if (Auth::user()->role == 1) {
            return redirect()->route("admin");
        }
        if (Auth::user()->role == 2) {
            return redirect()->route("profesor");
        }
        if (Auth::user()->role == 3) {
            return $next($request);
        }
    }
}
