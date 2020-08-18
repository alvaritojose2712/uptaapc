<?php

namespace App\Http\Controllers;

use App\trayecto;
use Response;
use Illuminate\Http\Request;

class TrayectoController extends Controller
{
    public function viewIndex(Request $req)
    {
        return view("admin.trayecto.index");
    }
    public function index(Request $req)
    {

        
        $data = trayecto::with([
            "estudiante"=>function($q){
                $q->with([
                    "trayecto"=>function($q){
                        $q->with(["notas","profesor","uc","seccion"]);
                    },
                    "nombrecarrera"
                ]);
            },
            "seccion"=>function($q){
                $q->with("carrera");
            },
            "notas",
            "profesor",
            "uc"=>function($q){
                $q->with(["categoria"=>function($q){
                    $q->with("carrera");
                }]);
            }
        ])
        ->get()
        ->map(function($q){
            $q->nombreSeccion = $q->seccion->nombre;
            $q->nombreCarrera = $q->seccion->carrera->nombre;
            $q->nombreUc = $q->uc->nombre;
            $q->fecha = \DateTime::createFromFormat("Y-m-d",$q->ano."-".$q->mes."-".$q->dia)->format("Y-m-d");
            return $q;
        });

        $dataDesor = $data;

        $data = $data->groupBy(["nombreCarrera","ano","trayecto","trimestre","nombreSeccion","nombreUc"]);

        
        
        return Response::json( ["ordenado"=>$data,"sinOrden"=>$dataDesor] );
        // return Response::json( ["dist"=>$dist,"data"=>$data] );
    }
    public function store(Request $req){
        
        try {
            if ($req->type==="delete") {
               trayecto::find($req->id_update)->delete();
            }else{

                foreach ($req->slestudiantes as $e) {
                    if($req->type==="update"){
                        $c = trayecto::find($req->id_update);
                    }else{
                        $c = new trayecto;
                    }

                    $c->dia = \DateTime::createFromFormat("Y-m-d",$req->fecha)->format("d");
                    $c->mes = \DateTime::createFromFormat("Y-m-d",$req->fecha)->format("m");
                    $c->ano = \DateTime::createFromFormat("Y-m-d",$req->fecha)->format("Y");

                    $c->trayecto = $req->trayecto;
                    $c->trimestre = $req->trimestre;
                    $c->id_uc = $req->sluc;
                    $c->id_profesor = $req->slpersonal;
                    $c->id_estudiante = $e["id"];
                    $c->id_seccion = $req->slsecciones;
                    $c->save();
                }
            }

            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
   
}
