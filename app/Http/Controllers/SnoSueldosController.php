<?php

namespace App\Http\Controllers;

use App\sno_sueldos;
use Illuminate\Http\Request;

class SnoSueldosController extends Controller
{
   use \App\Traits\ControllerAsyn;
    protected $model = sno_sueldos::class;
    protected $view = "";
    protected $validate = ['nombre' => 'required|string|max:255'];
    protected $where = [
        "id",
        "categoria",
        "cargo",
        "dedicacion",
        "salario",
    ];
    
}
