<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Partidas_presupuestaria;
use App\Acciones_proyecto;
use App\Acciones_especifica;
use App\Presupuesto_ordinario;

use Response;

class partidasController extends Controller
{
   
    public function index(Request $req)
    {
        return Partidas_presupuestaria::orWhere("codigo","LIKE",$req->q."%")
        ->orWhere("descripcion","LIKE",$req->q."%")
        ->get()
        ->take($req->limit);
    }

    
    public function store(Request $req)
    {
       try{

            if ($req->modo==="delete") {
                Partidas_presupuestaria::find($req->id)->delete();
            }else{
                if ($req->modo==="update") {
                    $obj = Partidas_presupuestaria::find($req->idupdate);
                }else{
                    $obj = new Partidas_presupuestaria;
                }
                $obj->codigo = $req->codigo;
                $obj->partida = $req->partida;
                $obj->descripcion = $req->descripcion;
                $obj->save();
            }

            return Response::json( ["estado"=>true,"msj"=>"¡Éxito!"] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
          
    }
    
    public function show($id)
    {
        $id = str_replace(".", "", (string)$id);
        try{
            $partidas = Partidas_presupuestaria::where("codigo","LIKE","$id%")
                ->orWhere("partida","LIKE","$id%")
                ->get()->take(15);

            if (strlen((string)$id)===9) {
                $id = parsePartida($id);
                $partidas_padre = Partidas_presupuestaria::where("codigo","LIKE","$id%")->get()->count();
                if ($partidas->count()===1) {
                    
                    $arr_data_partida_padre = array(
                        "num" => $partidas_padre==0?0:$partidas_padre-1,
                        "data" =>  Acciones_proyecto::with(["especificas" => function($q) use ($id){
                            
                            $q->with(["ordinario"=>function($qq) use ($id){
                                $qq->with(["movimientos"])->where("partida","LIKE","$id%")->orderBy("fecha","desc");
                            }])->whereIn("id",function($qq) use ($id){
                                $qq->from("presupuesto_ordinarios")->where("partida","LIKE","$id%")->select("ae");
                            })->orderBy("fecha","desc");

                        }])
                        ->whereIn("id",function($q) use ($id){
                            $q->from("acciones_especificas")->whereIn("id",function($qq) use ($id){
                                $qq->from("presupuesto_ordinarios")->where("partida","LIKE","$id%")->select("ae");
                            })->select("acciones_proyectos_id");
                        })
                        ->orderBy("tipo","Proyecto")
                        ->get(),
                    );
                    $partidas[0]->partida_padre = $arr_data_partida_padre;
                }
            }
            return $partidas;
        }catch(\Exception $e){
            return $e->getMessage();
        }
    }

    
    
}

