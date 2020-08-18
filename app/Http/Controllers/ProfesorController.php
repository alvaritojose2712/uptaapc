<?php

namespace App\Http\Controllers;

use App\personal;
use App\trayecto;
use App\notas_estudiantes;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Response;

class ProfesorController extends Controller
{

    public function dashboard()
    {
        return view("profesor.dashboard");
        
    }

    public function cargarnotas()
    {
        return view("profesor.cargarnotas");
        
    }
    public function academico(Request $req)
    {
        $data = trayecto::with(["estudiante","uc"=>function($q){
        	$q->with(["categoria"=>function($q){
	        	$q->with("carrera");
	        }]);
        },"seccion"=>function($q){
        	$q->with("carrera");
        },"notas"])->where("id_profesor",personal::where("cedula",session("cedula"))->first("id")->id)->get()->map(function($q){
        	$q->seccion1 = $q->seccion->carrera->nombre." - ".$q->seccion->nombre;
        	$q->uc1 = $q->uc->nombre;
        	return $q;
        })->groupBy(["trayecto","trimestre","seccion1","uc1"]);

        return Response::json( $data );
    }

    public function nota(Request $req)
    {
    	 try {
    	 	foreach ($req->notas as $e) {
    	 		foreach ($e as $ee) {
	    	 		if (isset($ee["type"])&&($ee["type"]==="update"||$ee["type"]==="new")) {
	            $c = ($ee["type"]==="new")?new notas_estudiantes:(($ee["type"]==="update")?notas_estudiantes::find($ee["id"]):null);

	            $c->id_trayecto = $ee["id_trayecto"];
	            $c->puntos = $ee["puntos"]!==null?$ee["puntos"]:0;
	            $c->modo = !$ee["modo"]?"Final":$ee["modo"];

	            $c->save();
			            
	    	 		}else if (isset($ee["type"])&&$ee["type"]==="delete") {
			            notas_estudiantes::find($ee["id"])->delete();
	    	 		}
    	 		}
	            
    	 	}
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }
    }
    
}
