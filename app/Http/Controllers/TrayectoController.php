<?php

namespace App\Http\Controllers;

use App\trayecto;
use App\notas_estudiantes;
use App\uc;
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
                 

            $q->ano = \DateTime::createFromFormat("Y-m-d",$q->fecha)->format("Y");
            $q->nombreSeccion = $q->seccion->nombre;
            $q->nombreCarrera = $q->seccion->carrera->nombre;
            $q->nombreUc = $q->uc->nombre . " - " . $q->profesor->nombre." ".$q->profesor->apellido;
            return $q;
        });

        $dataDesor = $data;

        

        
        
        return Response::json( [
            "ordenado" => $data->groupBy(["nombreCarrera","ano","trayecto","trimestre","nombreSeccion","nombreUc"]),
            "sinOrden" => $data,
            "porCarrera" => $data->groupBy(["nombreCarrera","estudiante.id"])
        ] );
        // return Response::json( ["dist"=>$dist,"data"=>$data] );
    }
    public function store(Request $req){
        
        try {
            if ($req->type==="delete") {
               trayecto::whereIn("id",$req->id_update)->delete();
               return Response::json( ["msj"=>"¡Operación exitosa!", "code" => 200] );
            }else{

                // if ($req->type==="crear") {
                //     # code...
                // }

                foreach ($req->slestudiantes as $e) {
                    
                    $id_estudiante = $e["id"];

                    foreach ($req->slprofeuc as $profeuc) {

                        
                        $id_profesor = $profeuc["profesor"]["id"];
                        $id_uc = $profeuc["uc"]["id"];

                        if ($req->type!="editEstudiante") {
                            trayecto::where([
                                "fecha" => $req->fecha,
                                "fecha_cierre" => $req->fecha_cierre,
                                "trayecto" => $req->trayecto,
                                "trimestre" => $req->trimestre,
                                "id_seccion" => $req->slsecciones,
                                "id_profesor" => $id_profesor,
                                "id_uc" => $id_uc,
                            ])
                            ->whereNotIn("id",
                                array_map( function($e) {
                                    if(array_key_exists("id_trayecto", $e)){
                                        return $e["id_trayecto"];
                                    } 
                                }, $req->slestudiantes )
                            )
                            ->delete();
                        }



                        if (array_key_exists("id_trayecto",$e)) {
                            $c = trayecto::find($e["id_trayecto"]);
                            if (!$c) {
                                $c = new trayecto;
                            }
                        }else{
                            $c = new trayecto;
                        }
                        
                        $c->fecha_cierre = $req->fecha_cierre; 
                        $c->fecha = $req->fecha; 
                        $c->trayecto = $req->trayecto;
                        $c->trimestre = $req->trimestre;
                        $c->id_seccion = $req->slsecciones;
                        
                        $c->id_estudiante = $id_estudiante;
                        
                        $c->id_profesor = $id_profesor;
                        $c->id_uc = $id_uc;

                        
                        $c->save();
                        

                        

                    }
                }
            }

            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
   
}
