<?php

namespace App\Http\Controllers;

use App\estudiante;
use App\user;
use Illuminate\Http\Request;
use Dompdf\Dompdf;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use Auth;

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
        return view("estudiante.dashboard");
        
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function primerainscripcion()
    {
        return view("estudiante.primerainscripcion");
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */

    public function primerainscripcionStore(Request $request){

        
        $request->validate([
            'nombres' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'nacimiento' => 'required|date',
            'sexo' => 'required|string|max:255',
            'estado_civil' => 'required',
            'direccion' => 'required|string|max:255',
            'ciudad' => 'required|string|max:255',
            'estado' => 'required|string|max:255',
            'telefono' => 'required|digits:11',
            'trabaja' => 'required|boolean',
            'hijos' => 'required|integer',
            'file_cedula' => "required|mimes:jpg,jpeg,png,pdf|max:10240",
            'file_fondo_negro' => "required|mimes:jpg,jpeg,png,pdf|max:10240",
            'file_notas' => "required|mimes:jpg,jpeg,png,pdf|max:10240",
            'file_foto' => "required|mimes:jpg,jpeg,png|max:10240",
        ]);
        $nameFolder = "public/docsEstudiante/".$request->cedula . " " . date("Y-m-d")." ".time();
        try {
            


            $file_cedula = $request->file('file_cedula')->storeAs($nameFolder,"file_cedula".".".$request->file('file_cedula')->extension());
            $file_fondo_negro = $request->file('file_fondo_negro')->storeAs($nameFolder,"file_fondo_negro".".".$request->file('file_fondo_negro')->extension());
            $file_notas = $request->file('file_notas')->storeAs($nameFolder,"file_notas".".".$request->file('file_notas')->extension());
            $file_foto = $request->file('file_foto')->storeAs($nameFolder,"file_foto".".".$request->file('file_foto')->extension());


            $obj = new estudiante;
            $obj->nombres = $request->nombres;
            $obj->apellidos = $request->apellidos;
            $obj->cedula = Auth::user()->cedula;

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
            
            $obj->file_cedula = preg_replace("/public\//","storage/",$file_cedula,1);
            $obj->file_fondo_negro = preg_replace("/public\//","storage/",$file_fondo_negro,1);
            $obj->file_notas = preg_replace("/public\//","storage/",$file_notas,1);
            $obj->file_foto = preg_replace("/public\//","storage/",$file_foto,1);
            
            $obj->save();

            $user = User::where("cedula",Auth::user()->cedula)->update(["inscrito"=>1]);


            return redirect("estudiante")->with('msj', 'Los datos han sido enviados satisfactoriamente.');
        } catch (\Exception $e) {
            Storage::deleteDirectory($nameFolder);
            return redirect()->back()->withInput()->withErrors($e->getMessage());
        }
           
    }
    public function store(Request $request)
    {
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
