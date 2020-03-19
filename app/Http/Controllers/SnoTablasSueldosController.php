<?php

namespace App\Http\Controllers;

use App\sno_tablas_sueldos;
use Illuminate\Http\Request;

class SnoTablasSueldosController extends Controller
{
   use \App\Traits\ControllerAsyn;
    protected $model = sno_tablas_sueldos::class;
    protected $view = "";
    protected $validate = ['nombre' => 'required|string|max:255'];
    protected $where = [
        "id",
        "descripcion",
        "fecha",
    ];
    protected $withCheck = true; 
    public function with()
    {
        return ["sueldos"];
    }
}
