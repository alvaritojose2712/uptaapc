<?php

namespace App\Http\Controllers;

use App\uc;
use Response;
use Illuminate\Http\Request;

class UcController extends Controller
{
    use \App\Traits\ControllerAsyn;
    public function index(Request $req)
    {
        
        $data = uc::with(["categoria"=>function($q){
            $q->with("carrera");
        }])->where(function($q) use ($req){
            foreach (["id","nombre","trayecto","duracion"] as $val) {
                $q->orWhere($val,"LIKE",$req->q."%");
            }
        })->take(10)->orderBy("created_at","desc")->get();
        
        return Response::json( $data );
    }

    

    public function store(Request $req){
        try {
            $c = new uc;
            $c->nombre = $req->nombre;
			$c->u_credito = $req->u_credito;
			$c->duracion = $req->duracion;
			$c->trayecto = $req->trayecto;
			$c->id_categoria = $req->id_categoria;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }

    public function destroy(Request $req){
        try {
            uc::find($req->id)->delete();
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
}
