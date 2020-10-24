<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class presupuestoController extends Controller
{
	public function index(Request $req)
	{
		return view("presupuesto.index");
	}
  public function cruds(Request $req)
  {
  	return view("presupuesto.cruds");
  }
}
