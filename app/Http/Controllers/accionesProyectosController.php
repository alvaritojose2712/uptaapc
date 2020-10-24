<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Acciones_proyecto;
use App\Acciones_especifica;

use Response;

class accionesProyectosController extends Controller
{
    
    public function index()
    {
       return Acciones_proyecto::with(["especificas"=>function($q){
            $q->with(["ordinario"=>function($q){
                    $q->with(["movimientos","partida","uno_uno_especifica"])->orderBy("fecha","DESC");
                }]);
        }])->get();
    }

    
    public function store(Request $req)
    {
        try{

            if ($req->modo==="delete") {
                Acciones_proyecto::find($req->id)->delete();
            }else{
                if ($req->modo==="update") {
                    $obj = Acciones_proyecto::find($req->idupdate);
                }else{
                    $obj = new Acciones_proyecto;
                }
                $obj->nombre = $req->nombre;
                $obj->descripcion = $req->descripcion;
                $obj->tipo = $req->tipo;
                $obj->fecha = $req->fecha;
                

                if ($obj->save()) {
                    if ($req->modo==="update") {
                        //Eliminar
                        Acciones_especifica::where("acciones_proyectos_id",$obj->id)
                        ->whereNotIn("id",array_map(function($e){return $e["id"];},$req["especificas"]))
                        ->delete();
                        
                    }


                    foreach ($req["especificas"] as $especifica) {
                        if (!count(Acciones_especifica::where("id", $especifica["id"])->where("acciones_proyectos_id",$obj->id)->get())) {
                                $acc = new Acciones_especifica;
                        
                                $acc->nombre = $especifica["nombre"];
                                $acc->descripcion = $especifica["descripcion"];
                                $acc->fecha = $especifica["fecha"];
                                
                                $acc->acciones_proyectos_id = $obj->id;
                    
                                $acc->save();
                        }
                    }
                }
            }

            return Response::json( ["estado"=>true,"msj"=>"¡Éxito!"] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
    }

    public function show($id)
    {
        return Acciones_proyecto::with(["especificas"=>function($q){
            $q->with(["ordinario"=>function($qq){
                $qq->with(["movimientos","partida","ae"])->orderBy("fecha","DESC");
            }]);
        }])->where("nombre","LIKE","$id%")
            ->orWhere("descripcion","LIKE","$id%")
            ->get();
    }

}
