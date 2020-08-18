<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\personal;
use Illuminate\Support\Facades\Blade;
use Response;


class personalController extends Controller
{
    
   public function view()
   {
       return view("recursos_humanos.personal.index");
   }
    public function index(Request $req)
    {
        
        $data = personal::with(["hijos"])->where(function($q) use ($req){
            foreach (["id","cedula","apellido","nombre"] as $val) {
                $q->orWhere($val,"LIKE",$req->q."%");
            }
        })->take(10)->orderBy("created_at","desc")->get();
        
        return Response::json( $data );
    }
    public function store(Request $req){
        try {
            $c = new personal;
            // $c->id_uc = $req->id_uc;
            // $c->id_profesor = $req->id_profesor;
            // $c->id_estudiante = $req->id_estudiante;
            // $c->id_seccion = $req->id_seccion;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
    
    public function update(Request $req){
        try {
            $c = personal::find($req->id);
            // $c->id_uc = $req->id_uc;
            // $c->id_profesor = $req->id_profesor;
            // $c->id_estudiante = $req->id_estudiante;
            // $c->id_seccion = $req->id_seccion;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }
    }

    public function destroy(Request $req){
        try {
            personal::find($req->id)->delete();
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }

    }
    // public function index()
    // {
    //     return personal::with("hijos")->get();
    // }

    // /**
    //  * Show the form for creating a new resource.
    //  *
    //  * @return \Illuminate\Http\Response
    //  */
    // public function create()
    // {
    //     //
    // }

    // /**
    //  * Store a newly created resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @return \Illuminate\Http\Response
    //  */
    // public function store(Request $request)
    // {
    //     try{
    //         $per = personal::create($request->data_padre);
    //         $per->hijos()->createMany($request->hijos);
    //         return response(["code"=>200,"msj"=>"¡Éxito al guardar!"],200);
    //     }catch(\Exception $e){
    //        return response(["code"=>500,"msj"=>$e->getMessage()],200);
    //     }
    // }

    // /**
    //  * Display the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function show($id)
    // {
    //     return personal::with("hijos")->where("cedula","LIKE","$id%")
    //         ->orWhere("nombre","LIKE","$id%")
    //         ->orWhere("apellido","LIKE","$id%")
    //         ->get();
    // }

    // /**
    //  * Show the form for editing the specified resource.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function edit($id)
    // {
    //     // return View::make('nerds.edit')
    //     //     ->with('user', personal::find($id));
    // }

    // /**
    //  * Update the specified resource in storage.
    //  *
    //  * @param  \Illuminate\Http\Request  $request
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function update(Request $request, $id)
    // {
    //     try{
    //         $per = personal::find($id);
    //         #Actualizar representante
    //         $per->update($request->data_padre);
    //         #Ingresar hijos
    //         $per->hijos()->createMany(array_filter($request->hijos,function($val){
    //             return !isset($val['id'])&&!isset($val['remove']);
    //         }));
            
    //         #Actualizar hijos existentes
    //         $hijos_old = array_filter($request->hijos,function($val){
    //             return isset($val['id'])&&isset($val['type'])&&!isset($val['remove']);
    //         });
    //         foreach ($hijos_old as $val) {
    //             unset($val['type']);
    //             unset($val['cedula_representante']);
    //             $per->hijos()->where("id",$val['id'])->update($val);
    //         }

    //         #Borrar hijos
    //         $hijos_remove = array_filter($request->hijos,function($val){
    //             return isset($val['remove']);
    //         });
    //         foreach ($hijos_remove as $val) {
    //             $per->hijos()->where("id",$val['id'])->delete();
    //         }

    //         return response(["code"=>200,"msj"=>"¡Éxito al editar!"],200);
    //     }catch(\Exception $e){
    //        return response(["code"=>500,"msj"=>$e->getMessage()],200);
    //     }
    // }

    // /**
    //  * Remove the specified resource from storage.
    //  *
    //  * @param  int  $id
    //  * @return \Illuminate\Http\Response
    //  */
    // public function destroy($id)
    // {
        
    //     try{
    //         personal::find($id)->delete();
    //         return response(["code"=>200,"msj"=>"¡Éxito al eliminar!"],200);
    //     }catch(\Exception $e){
    //        return response(["code"=>500,"msj"=>$e->getMessage()],200);
    //     }
    // }
}