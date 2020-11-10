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
    public function show(Request $req)
    {
        return personal::find(session()->get("id"));
    }

    public function dashboard()
    {
        return view("profesor.dashboard"); 
    }
    public function cargarnotas()
    {
        return view("profesor.cargarnotas");
        
    }
    public function tareas(Request $req)
    {
        

        try {
            $id_referencia = uniqid();
            if ($req->modoQueryTarea==="delete") {
                # code...
            }else{

                
                if ($req->modoQueryTarea==="update") {
                    foreach ($req->notas as $e) {
                        foreach ($e as $ee) {
                            if (isset($ee["type"])&&($ee["type"]==="update"||$ee["type"]==="new")) {
                        $c = ($ee["type"]==="new")?new notas_estudiantes:(($ee["type"]==="update")?notas_estudiantes::find($ee["id"]):null);

                        $c->id_trayecto = $ee["id_trayecto"];
                        $c->puntos = $ee["puntos"]!==null?$ee["puntos"]:0;
                        $c->modo = !$ee["modo"]?"Final":$ee["modo"];
                        $c->nombre = $ee["nombre"];
                        $c->fecha_entrega = $ee["fecha_entrega"];
                        $c->completado = $ee["completado"];


                        $c->uniqid = $id_referencia;

                        $c->save();
                                
                            }else if (isset($ee["type"])&&$ee["type"]==="delete") {
                                notas_estudiantes::find($ee["id"])->delete();
                            }
                        }
                        
                    }
                }else if($req->modoQueryTarea==="create"){
                    foreach ($req->ids as $id) {
                        $obj = new notas_estudiantes;
                        $obj->modo = $req->modo;
                        $obj->puntos = $req->puntos;
                        $obj->id_trayecto = $id;
                        $obj->nombre = $req->nombre;
                        $obj->fecha_entrega = $req->fecha_entrega;
                        $obj->completado = $req->completado;
                        $obj->uniqid = $id_referencia;

                        
                        $obj->save();
                    }
                }

               
                                
            }
            return Response::json( ["estado"=>true,"msj"=>"¡Éxito!"] );


        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
    }
    public function academico(Request $req)
    {
        $grupos = ["trayecto","trimestre","seccion1","uc1"];
        if ($req->fecha) {
            $grupos = ["ano","trayecto","trimestre","seccion1","uc1"];
        }


        $data = trayecto::with(["estudiante","uc"=>function($q){
        	$q->with(["categoria"=>function($q){
	        	$q->with("carrera");
	        }]);
        },"seccion"=>function($q){
        	$q->with("carrera");
        },"notas"=>function($q){
            $q->orderBy("created_at","desc");
        }])->where("id_profesor",session()->get("id"))->get()->map(function($q){
        	$q->seccion1 = $q->seccion->carrera->nombre." - ".$q->seccion->nombre;
            $q->uc1 = $q->uc->nombre;
        	return $q;
        });

        return Response::json( [
            "academico" => $data->groupBy($grupos), 
            "secciones_num" => count($data->groupBy("id_seccion")),
            "materias_num" => count($data->groupBy("id_uc")),
            "estudiantes_num" => count($data->groupBy("id_estudiante")),
        ] );
    }

    public function nota(Request $req)
    {
    	 // try {
    	 // 	foreach ($req->notas as $e) {
    	 // 		foreach ($e as $ee) {
	    	//  		if (isset($ee["type"])&&($ee["type"]==="update"||$ee["type"]==="new")) {
	     //        $c = ($ee["type"]==="new")?new notas_estudiantes:(($ee["type"]==="update")?notas_estudiantes::find($ee["id"]):null);

	     //        $c->id_trayecto = $ee["id_trayecto"];
	     //        $c->puntos = $ee["puntos"]!==null?$ee["puntos"]:0;
	     //        $c->modo = !$ee["modo"]?"Final":$ee["modo"];
      //           $c->uniqid = uniqid();

	     //        $c->save();
			            
	    	//  		}else if (isset($ee["type"])&&$ee["type"]==="delete") {
			   //          notas_estudiantes::find($ee["id"])->delete();
	    	//  		}
    	 // 		}
	            
    	 // 	}
      //       return Response::json( ["msj"=>"¡Operación exitosa!"] );
      //   } catch (\Exception $e) {
      //       return Response::json( ["error"=>$e->getMessage()] );
      //   }
    }
    
}
