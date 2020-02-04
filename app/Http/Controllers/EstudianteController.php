<?php

namespace App\Http\Controllers;

use App\estudiante;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;

class EstudianteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }
    public function pdf($id){
        // $data = estudiante::find($id);
        // $view = view("estudiante.showCrudo",compact("data"));
        // $dompdf = new DOMPDF();
        // $dompdf->load_html($view);
        // $dompdf->render();
        // return $dompdf->stream("ReporteEstudiante-".date("Y-m-d").".pdf");

    }
    public function items(Request $req)
    {
        $data = estudiante::orWhere("id","LIKE",$req->q."%")
        ->orWhere("cedula","LIKE",$req->q."%")
        ->get();
        return view("estudiante.items",compact("data"));
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view("estudiante.index");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view("estudiante.create");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $nameFolder = "docsSeminario/".$request->cedula . " " . date("Y-m-d")." ".time();

        $file_cedula = $request->file('file_cedula')->storeAs($nameFolder,"file_cedula".".".$request->file('file_cedula')->extension());
        $file_fondo_negro = $request->file('file_fondo_negro')->storeAs($nameFolder,"file_fondo_negro".".".$request->file('file_fondo_negro')->extension());
        $file_notas = $request->file('file_notas')->storeAs($nameFolder,"file_notas".".".$request->file('file_notas')->extension());
        $file_foto = $request->file('file_foto')->storeAs($nameFolder,"file_foto".".".$request->file('file_foto')->extension());
        $file_const_traba = $request->file('file_const_traba')->storeAs($nameFolder,"file_const_traba".".".$request->file('file_const_traba')->extension());
        $file_sintesis = $request->file('file_sintesis')->storeAs($nameFolder,"file_sintesis".".".$request->file('file_sintesis')->extension());
        $file_pago = $request->file('file_pago')->storeAs($nameFolder,"file_pago".".".$request->file('file_pago')->extension());





        try {
            $obj = new estudiante;
            $obj->nombres = $request->nombres;
            $obj->apellidos = $request->apellidos;
            $obj->cedula = $request->cedula;
            $obj->nacimiento = $request->nacimiento;
            $obj->sexo = $request->sexo;
            $obj->l_trabajo = $request->l_trabajo;
            $obj->estado_civil = $request->estado_civil;
            $obj->direccion = $request->direccion;
            $obj->ciudad = $request->ciudad;
            $obj->estado = $request->estado;
            $obj->telefono = $request->telefono;
            $obj->trabaja = $request->trabaja;
            $obj->hijos = $request->hijos;
            $obj->observacion = $request->observacion;
            


            $obj->nameFolder = $nameFolder;
            $obj->file_cedula = $file_cedula;
            $obj->file_pago = $file_pago;

            $obj->file_fondo_negro = $file_fondo_negro;
            $obj->file_notas = $file_notas;
            $obj->file_foto = $file_foto;
            $obj->file_const_traba = $file_const_traba;
            $obj->file_sintesis = $file_sintesis;
            
            
            
            
            
            $obj->save();
            if($obj){
                
                // if($request->egresos) $obj->egresos_hogar()->createMany($request->egresos);
                // if($request->servicios) $obj->vivienda_servicios()->createMany($request->servicios);
                // if($request->enfermos) $obj->familiares_enfer()->createMany($request->enfermos);
                // if($request->familiares) $obj->familiares()->createMany($request->familiares);
                // if($request->discapacitados) $obj->discapacidad_estudiante()->createMany($request->discapacitados);
            }
          

            return "¡Guardado Correctamente!";
        } catch (\Exception $e) {
            Storage::deleteDirectory($nameFolder);
            
            if($e->errorInfo[1] == 1062){
                
                return "Error: ¡Número de cédula ya existe!";
            }else{

                return "Error al Guardar ".$e->getMessage();
            }
                // return "Error al Guardar ".$e->getMessage();
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function show(estudiante $estudiante)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function edit(estudiante $estudiante)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, estudiante $estudiante)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\estudiante  $estudiante
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $estudiante = estudiante::find($id);
            Storage::deleteDirectory($estudiante->nameFolder);
            $estudiante->delete();
            return back();
        } catch (\Exception $e) {
            return "Error al eliminar ".$e->getMessage();
        }
    }
}
