<?php

namespace App\Http\Controllers;

use App\profesor;
use App\User;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Storage;

class ProfesorController extends Controller
{
    use \App\Traits\ControllerAsyn;
    protected $model = profesor::class;
    protected $view = "";
    protected $validate = [];
    protected $where = [
        "id",
        "nombres",
        "apellidos",
        "cedula",
    ];
    // protected $withCheck = true; 
    // public function with()
    // {
    //     return [];
    // }

    public function dashboard()
    {
        return view("profesor.dashboard");
        
    }
    public function cargarprofesor()
    {
        return view("profesor.cargarprofesor");
    }
    public function cargarprofesorStore(Request $request)
    {
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
            'hijos' => 'required|integer',
            'file_cedula' => "required|mimes:jpg,jpeg,png,pdf|max:10240",
            'file_foto' => "required|mimes:jpg,jpeg,png|max:10240",
        ]);
        $nameFolder = "public/docsProfesor/".$request->cedula . " " . date("Y-m-d")." ".time();
        try {
            


            $file_cedula = $request->file('file_cedula')->storeAs($nameFolder,"file_cedula".".".$request->file('file_cedula')->extension());
            $file_foto = $request->file('file_foto')->storeAs($nameFolder,"file_foto".".".$request->file('file_foto')->extension());


            $obj = new profesor;
            $obj->nombres = $request->nombres;
            $obj->apellidos = $request->apellidos;
            $obj->cedula = Auth::user()->cedula;

            $obj->nacimiento = $request->nacimiento;
            $obj->sexo = $request->sexo;
            $obj->estado_civil = $request->estado_civil;
            $obj->direccion = $request->direccion;
            $obj->ciudad = $request->ciudad;
            $obj->estado = $request->estado;
            $obj->telefono = $request->telefono;
            $obj->hijos = $request->hijos;
            $obj->observacion = $request->observacion;

            $obj->nameFolder = $nameFolder;

            $obj->file_cedula = preg_replace("/public\//","storage/",$file_cedula,1);
            $obj->file_foto = preg_replace("/public\//","storage/",$file_foto,1);
            
            $obj->save();

            $user = User::where("cedula",Auth::user()->cedula)->update(["inscrito"=>1]);


            return redirect("profesor")->with('msj', 'Los datos han sido enviados satisfactoriamente.');
        } catch (\Exception $e) {
            Storage::deleteDirectory($nameFolder);
            return redirect()->back()->withInput()->withErrors($e->getMessage());
        }
    }

    
}
