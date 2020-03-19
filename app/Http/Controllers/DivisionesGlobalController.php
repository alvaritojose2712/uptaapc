<?php

namespace App\Http\Controllers;

use App\Divisiones_global;
use Illuminate\Http\Request;

class DivisionesGlobalController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = Divisiones_global::class;
    protected $view = "";
    protected $validate = [];
    protected $where = ["denominacion","porcentaje"];
}
