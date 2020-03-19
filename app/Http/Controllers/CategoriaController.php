<?php

namespace App\Http\Controllers;

use App\categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = categoria::class;
    protected $view = "";
    protected $validate = [];
    protected $where = [
        "id",
        
    ];
    protected $withCheck = true; 
    public function with()
    {
        return [""];
    }
}
