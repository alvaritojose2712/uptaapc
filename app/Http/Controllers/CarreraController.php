<?php

namespace App\Http\Controllers;

use App\carrera;
use App\notas_estudiantes;
use App\uc;
use Illuminate\Http\Request;
use Response;

class CarreraController extends Controller
{

    public function index(Request $req)
    {

        
        $whe = ["id","nombre"];
        $data = carrera::with(["categorias"=>function($q){
            $q->with(["ucs"=>function($q){
                $q->with(["escala","prela"=>function($q){
                    $q->with("uc");
                }]);
            }]);
        },"secciones"])->where(function($q) use ($req,$whe){
            foreach ($whe as $val) {
                $q->orWhere($val,"LIKE",$req->q."%");
            }
        })->orderBy("created_at","desc")->get();
            
        return Response::json( $data );
       



    }

    public function viewIndex(Request $req)
    {
        return view("admin.carrera.index");
    }

    public function store(Request $req){
        try {
            $c = new carrera;
            $c->nombre = $req->nombreCarrera;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
    
    public function update(Request $req){
        try {
            $c = carrera::find($req->id);
            $c->nombre = $req->nombre;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }
    }

    public function destroy(Request $req){
        try {
            carrera::find($req->id)->delete();
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
    
   
}
