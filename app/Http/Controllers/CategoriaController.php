<?php

namespace App\Http\Controllers;

use App\categoria;
use Response;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = categoria::class;
    protected $view = "";
    protected $validate = [];
    protected $where = [
        "id",
        
    ];
    protected $withCheck = true; 
    public function with()
    {
        return [""];
    }

    public function store(Request $req){
        try {
            $c = new categoria;
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
            $c = categoria::find($req->id);
            $c->nombre = $req->nombre;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }
    }

    public function destroy(Request $req){
        try {
            categoria::find($req->id)->delete();
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
}
