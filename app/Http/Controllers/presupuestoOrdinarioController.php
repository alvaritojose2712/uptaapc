<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Presupuesto_ordinario;
use Response;

class presupuestoOrdinarioController extends Controller
{
   
   public function index()
    {
       return Presupuesto_ordinario::with('uno_uno_especifica')->get();
    }

    public function store(Request $req)
    {
        try{

            if ($req->modo==="delete") {
                Presupuesto_ordinario::find($req->id)->delete();
            }else{
                if ($req->modo==="update") {
                    $obj = Presupuesto_ordinario::find($req->idupdate);
                }else{
                    $obj = new Presupuesto_ordinario;
                }

                $obj->monto = $req->monto;
                $obj->denominacion = $req->denominacion;
                $obj->ae = $req->ae;
                $obj->partida = $req->partida;
                $obj->fecha = $req->fecha;
                $obj->save();
            }

            return Response::json( ["estado"=>true,"msj"=>"¡Éxito!"] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }          
            
          
    }

   
    public function show($id)
    {
        return Presupuesto_ordinario::with('uno_uno_especifica')
            ->where("partida","LIKE","$id%")
            ->orWhereIn("ae",function($q) use ($id){
                $q->from("acciones_especificas")->where("nombre","LIKE","$id%")->select("id");
            })
            ->orWhere("denominacion","LIKE","$id%")
            ->orWhere("id","LIKE","$id%")
            ->get()->take(30);
    }

   
   

   
}
