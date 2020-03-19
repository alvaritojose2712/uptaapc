<?php

namespace App\Http\Controllers;

use App\sno_formulas;
use Illuminate\Http\Request;

class SnoFormulasController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = sno_formulas::class;
    protected $view = "";
    protected $validate = ['nombre' => 'required|string|max:255'];
    protected $where = [
        "id",
        "descripcion",
        "tipo_concepto",
        "tipo_sueldo",
        "movimiento",
        "dias",
        "partida",
    ];
    protected $withCheck = true; 
    public function with()
    {
        return ["versiones"=>function($q){
            $q->with(["denominacion"]);
        },"condiciones"=>function($q){
            $q->with(["valorall"]);
        }];
    }
}
