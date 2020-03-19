<?php

namespace App\Http\Controllers;

use App\sno_unidad_tributaria;
use Illuminate\Http\Request;

class SnoUnidadTributariaController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = sno_unidad_tributaria::class;
    protected $view = "";
    protected $validate = ['nombre' => 'required|string|max:255'];
    protected $where = [
        "id",
        "valor",
        "fecha",
    ];
}
