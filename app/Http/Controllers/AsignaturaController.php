<?php

namespace App\Http\Controllers;

use App\asignatura;
use Response;
use Illuminate\Http\Request;

class AsignaturaController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = asignatura::class;
    protected $view = "admin.asignatura";
    protected $validate = [];
    protected $where = [
        "id",
        
    ];
    protected $withCheck = true; 
    public function with()
    {
        return ["profesor","uc"];
    }
    public function store(Request $req)
    {
        try {
            
            // asignatura::truncate();
            foreach ($req->asignatura as $e) {
                if (!count(asignatura::where("id_uc",$e['uc']["id"])->where("id_profesor",$e['profesor']["id"])->get())) {
                    $asignatura = new asignatura;
                    $asignatura->id_profesor = $e['profesor']["id"];
                    $asignatura->id_uc = $e['uc']["id"];
                    $asignatura->save();
                }
            }
            return Response::json(['msj' => '¡Operación Exitosa!']);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()]);
        }
    }
    public function destroy(Request $req)
    {
        try {
            asignatura::find($req->id)->delete();
            return Response::json(['msj' => '¡Operación Exitosa!']);
        } catch (\Exception $e) {
            return Response::json(['error' => $e->getMessage()]);
        }
    }
}



