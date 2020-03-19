<?php

namespace App\Http\Controllers;

use App\uc;
use Illuminate\Http\Request;

class UcController extends Controller
{
    use \App\Traits\ControllerComun;
    protected $model = uc::class;
    protected $view = "admin.uc";
}
