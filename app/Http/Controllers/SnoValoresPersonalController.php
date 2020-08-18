<?php

namespace App\Http\Controllers;

use App\sno_valores_personal;
use Illuminate\Http\Request;
use Response;

class SnoValoresPersonalController extends Controller
{
    
    public function index(Request $req)
    {
    	return Response::json(sno_valores_personal::where("campo","LIKE",$req->campo)->get());
    }
}
