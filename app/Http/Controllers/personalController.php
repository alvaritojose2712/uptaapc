<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\personal;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\Facades\Storage;
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
        })->orderBy("created_at","desc")->get();
        
        return Response::json( $data );
    }
    public function store(Request $req){
        try{
            // $this->validate($req, [
            //     'file_foto' => 'nullable|sometimes|image|mimes:jpg,jpeg,png',
            //     'file_cedula' => 'nullable|sometimes|image|mimes:jpg,jpeg,png',
            // ]);
            
            if ($req->modo==="update") {
                $cli = personal::find($req->idupdate);
            }else{
                $cli = new personal;
            }
           
            
            $cli->nombre = $req->nombre;
            
            $cli->nombre = $req->nombre;
            $cli->apellido = $req->apellido;
            $cli->cedula = $req->cedula;
            $cli->n_carnet = $req->n_carnet;
            $cli->nacionalidad = $req->nacionalidad;
            $cli->genero = $req->genero;
            $cli->fecha_nacimiento = $req->fecha_nacimiento;
            $cli->estado_civil = $req->estado_civil;
            $cli->direccion = $req->direccion;
            $cli->telefono_1 = $req->telefono_1;
            $cli->telefono_2 = $req->telefono_2;
            $cli->correo = $req->correo;
            $cli->cuenta_bancaria = $req->cuenta_bancaria;
            $cli->observacion = $req->observacion;
            $cli->calzado = $req->calzado;
            $cli->gorra = $req->gorra;
            $cli->camisa = $req->camisa;
            $cli->pantalon = $req->pantalon;
            $cli->trabaja = $req->trabaja;
            $cli->categoria = $req->categoria;
            $cli->cargo = $req->cargo;
            $cli->dedicacion = $req->dedicacion;
            $cli->estado = $req->estado;
            $cli->estatus = $req->estatus;
            $cli->grado_instruccion = $req->grado_instruccion;
            $cli->departamento_adscrito = $req->departamento_adscrito;
            $cli->cargo_departamento = $req->cargo_departamento;
            $cli->profesion = $req->profesion;
            $cli->fecha_ingreso = $req->fecha_ingreso;
            $cli->caja_ahorro = $req->caja_ahorro;
            $cli->antiguedad_otros_ieu = $req->antiguedad_otros_ieu;
            $cli->hrs_nocturnas = $req->hrs_nocturnas;
            $cli->hrs_feriadas = $req->hrs_feriadas;
            $cli->hrs_diurnas = $req->hrs_diurnas;
            $cli->hrs_feriadas_nocturnas = $req->hrs_feriadas_nocturnas;

            // $cli->password = Hash::make($req->password);

           
            
            
            if ($cli->save()) {
                $path = "public/docsPersonal/".$cli->id;
                $obj_files = personal::find($cli->id);

                if ($req->hasFile('file_foto')) {
                    $obj_files->file_foto = str_replace("public","storage",$req->file('file_foto')->storeAs($path,"file_foto.".$req->file('file_foto')->extension()));
                }
                if ($req->hasFile('file_cedula')) {
                    $obj_files->file_cedula = str_replace("public","storage",$req->file('file_cedula')->storeAs($path,"file_cedula.".$req->file('file_cedula')->extension()));
                }
                $obj_files->save();

                // foreach ($req->hijos as $e) {
                //     $h = new hijos_personal;

                //     parentesco
                //     nombre
                //     apellido
                //     genero
                //     fecha_nacimiento
                //     cedula
                //     correo
                //     telefono_1
                //     estudia
                //     discapacidad
                //     cedula_representante
                // }
                
            }
                
                
            return Response::json( ["estado"=>true,"msj"=>"¡Éxito!"] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
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
    public function show($id)
    {
        return personal::with("hijos")->find(session()->get("id"));
    }

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

   
    public function destroy(Request $req)
    {
        
       try{
            $obj = personal::find($req->id);

            $file_foto =  str_replace("storage","public",$obj->file_foto);
            $file_cedula =  str_replace("storage","public",$obj->file_cedula);
            $file_sintesis =  str_replace("storage","public",$obj->file_sintesis);
            $file_fondo_negro =  str_replace("storage","public",$obj->file_fondo_negro);
            $file_notas =  str_replace("storage","public",$obj->file_notas);

            if ($obj->delete()) {

                Storage::delete($file_foto);
                Storage::delete($file_cedula);
                Storage::delete($file_fondo_negro);
                Storage::delete($file_sintesis);
                Storage::delete($file_notas);

                Storage::deleteDirectory("public/docsPersonal/".$req->id);
            }
            return Response::json( ["estado"=>true,"msj"=>"¡Éxito!"] );
        }catch(\Exception $e){
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
    }
}