<?php

namespace App\Http\Controllers;

use App\prelaciones_uc;
use Illuminate\Http\Request;
use Response;
class PrelacionesUcController extends Controller
{
   
    use \App\Traits\ControllerAsyn;
    protected $model = prelaciones_uc::class;
    protected $view = "";
    protected $where = ["id"];

    public function store(Request $req){
        try {
            $c = new prelaciones_uc;
            $c->id_uc = $req->id_uc;
            $c->prela = $req->prela;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }

    public function destroy(Request $req){
        try {
            prelaciones_uc::find($req->id)->delete();
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
}
