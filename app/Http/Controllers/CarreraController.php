<?php

namespace App\Http\Controllers;

use App\carrera;
use Illuminate\Http\Request;

class CarreraController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = carrera::class;
    protected $view = "";
    protected $validate = [];
    protected $where = [
        "id",
        "nombre"
    ];
    protected $withCheck = true; 
    public function with()
    {
        return ["categorias"=>function($q){
        	$q->with("ucs");
        }];
    }
}
