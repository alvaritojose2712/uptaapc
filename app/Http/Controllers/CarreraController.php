<?php

namespace App\Http\Controllers;

use App\carrera;
use Illuminate\Http\Request;
use Response;

class CarreraController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = carrera::class;
    protected $view = "admin.carrera";
    protected $validate = [];
    protected $where = [
        "id",
        "nombre"
    ];
    protected $withCheck = true; 
    public function with()
    {
        return ["categorias"=>function($q){
        	$q->with(["ucs"=>function($q){
                $q->with(["prela"=>function($q){
                    $q->with("uc");
                }]);
            }]);
        },"secciones"];
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
