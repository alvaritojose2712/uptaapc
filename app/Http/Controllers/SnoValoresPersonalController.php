<?php

namespace App\Http\Controllers;

use App\sno_valores_personal;
use Illuminate\Http\Request;

class SnoValoresPersonalController extends Controller
{
    
    use \App\Traits\ControllerAsyn;
    protected $model = sno_valores_personal::class;
    protected $view = "";
    protected $validate = ['nombre' => 'required|string|max:255'];
    protected $where = ["campo","valor"];
}
