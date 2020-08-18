<?php

namespace App\Http\Controllers;

use App\seccion;
use Illuminate\Http\Request;
use Response;

class SeccionController extends Controller
{
    
    public function index(Request $req)
    {
        
        $data = seccion::with(["carrera"])->where(function($q) use ($req){
            foreach (["nombre"] as $val) {
                $q->orWhere($val,"LIKE",$req->q."%");
            }
        })->take(10)->orderBy("id_carrera","asc")->get();
        
        return Response::json( $data );
    }

    public function store(Request $req){
        try {
            $c = new seccion;
            $c->nombre = $req->nombre;
            $c->id_carrera = $req->id_carrera;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
    public function update(Request $req){
        try {
            $c = seccion::find($req->id);
            $c->nombre = $req->nombre;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }
    }

    public function destroy(Request $req){
        try {
            seccion::find($req->id)->delete();
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
}
