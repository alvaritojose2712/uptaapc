<?php

namespace App\Http\Controllers;

use App\personal;
use App\trayecto;
use App\carrera;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Response;
use App\Http\Controllers\Auth\LoginController;

class EstudianteController extends Controller
{
    public function index(Request $req)
    {
        $data = personal::with(["trayecto"=>function($q){
            $q->with(["notas","profesor","uc","seccion"]);
        },"nombrecarrera"])
        ->where(function($q) use ($req){
            foreach (["id","cedula","apellido","nombre"] as $val) {
                $q->orWhere($val,"LIKE",$req->q."%");
            }
        })
        ->where("role",3)
        ->take(10)
        ->orderBy("created_at","desc")
        ->get()
        ->map(function($q){
            $q->academico = $q->trayecto->groupBy(["trayecto","trimestre"]);
            return $q;
        })
        ->groupBy("nombrecarrera.nombre");
        return Response::json( $data );
    }
    public function dashboard()
    {
        return view("estudiante.dashboard");
    }
    public function viewIndex()
    {
        return view("admin.estudiantes.index");
    }
    public function academicoIndex()
    {
        return view("estudiante.academico");
    }

    public function preInscripcionForm()
    {
        return view('auth.register');
    }
    public function preInscripcion(Request $req)
    {
        try {
            $personal = new personal;
            $personal->nombre = $req->nombre;
            $personal->apellido = $req->apellido;
            $personal->cedula = $req->cedula;
            $personal->telefono_1 = $req->telefono_1;
            $personal->correo = $req->correo;
            $personal->password = \Hash::make($req->password);
            $personal->carrera = $req->carrera;
            $personal->prosecucion = $req->prosecucion;
            $personal->role = 3;
            $personal->save();
            return Response::json( ["estado"=>true,"msj"=>"¡Registro exitoso! Inicie Sesión para continuar"] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
    }
    public function verificar(Request $req)
    {
        try {
            $personal = personal::find($req->id);
            $personal->verificado = $req->modo=="verificar"?1:0;
            $personal->save();
            return Response::json( ["estado"=>true,"msj"=>"¡Verificado con éxito!"] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
    }
    
    public function primerainscripcion(Request $req)
    {   
        if (!personal::with("nombrecarrera")->find(session()->get("id"))->inscrito) {
            return view("estudiante.primerainscripcion");
        }else{
            return redirect("/estudiante");
        }
    }
    public function primerainscripcionStore(Request $req)
    {
        if (!personal::with("nombrecarrera")->find(session()->get("id"))->inscrito) {
            $nameFolder = "public/docsPersonal/".$req->cedula . " " . date("Y-m-d")." ".time();
                
            try {
                $this->validate($req, [
                    'file_cedula' => 'required|image|mimes:jpeg,png,jpg,pdf|max:500',
                    'file_foto' => 'required|image|mimes:jpeg,png,jpg,pdf|max:500',
                    'file_notas' => 'required|image|mimes:jpeg,png,jpg,pdf|max:500',
                    'file_fondo_negro' => 'required|image|mimes:jpeg,png,jpg,pdf|max:500',
                ]);

                $personal = personal::find(session()->get("id"));

                $personal->inscrito = 1;

                $personal->nombre = $req->nombre; 
                $personal->apellido = $req->apellido; 
                $personal->cedula = $req->cedula; 
                $personal->n_carnet = $req->n_carnet; 
                $personal->nacionalidad = $req->nacionalidad; 
                $personal->genero = $req->genero; 
                $personal->fecha_nacimiento = $req->fecha_nacimiento; 
                $personal->estado_civil = $req->estado_civil; 
                $personal->direccion = $req->direccion; 
                $personal->telefono_1 = $req->telefono_1; 
                $personal->telefono_2 = $req->telefono_2; 
                $personal->correo = $req->correo; 
                $personal->cuenta_bancaria = $req->cuenta_bancaria; 
                $personal->observacion = $req->observacion; 
                $personal->calzado = $req->calzado; 
                $personal->gorra = $req->gorra; 
                $personal->camisa = $req->camisa; 
                $personal->pantalon = $req->pantalon; 
                $personal->trabaja = $req->trabaja; 

                if ($req->hasFile('file_cedula')) {
                    $file_cedula = $req->file('file_cedula')->storeAs($nameFolder,"file_cedula".".".$req->file('file_cedula')->extension());
                    $personal->file_cedula = preg_replace("/public\//","storage/",$file_cedula,1);
                }
                
                if ($req->hasFile('file_foto')) {
                    $file_foto = $req->file('file_foto')->storeAs($nameFolder,"file_foto".".".$req->file('file_foto')->extension());
                    $personal->file_foto = preg_replace("/public\//","storage/",$file_foto,1);
                }
                if ($req->hasFile('file_notas')) {
                    $file_notas = $req->file('file_notas')->storeAs($nameFolder,"file_notas".".".$req->file('file_notas')->extension());
                    $personal->file_notas = preg_replace("/public\//","storage/",$file_notas,1);
                }
                if ($req->hasFile('file_fondo_negro')) {
                    $file_fondo_negro = $req->file('file_fondo_negro')->storeAs($nameFolder,"file_fondo_negro".".".$req->file('file_fondo_negro')->extension());
                    $personal->file_fondo_negro = preg_replace("/public\//","storage/",$file_fondo_negro,1);
                }
                if ($req->hasFile('file_sintesis')) {
                    $file_sintesis = $req->file('file_sintesis')->storeAs($nameFolder,"file_sintesis".".".$req->file('file_sintesis')->extension());
                    $personal->file_sintesis = preg_replace("/public\//","storage/",$file_sintesis,1);
                }
                if (

                    $req->hasFile('file_sintesis')||
                    $req->hasFile('file_cedula')||
                    $req->hasFile('file_foto')||
                    $req->hasFile('file_notas')||
                    $req->hasFile('file_fondo_negro')
                ) {
                    $personal->nameFolder = $nameFolder;
                }


                $personal->save();

                \App\Traits\RestoreSession::restoreSession($personal);
                
                return Response::json( ["estado"=>true,"msj"=>"¡Inscripción exitosa!"] );
            } catch (\Exception $e) {
                Storage::deleteDirectory($nameFolder);
                return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
            }
        }
    }
    public function academico()
    {
        $data = personal::with(["trayecto"=>function($q){
            $q->with(["notas","profesor","uc","seccion"]);
        },"nombrecarrera"])->where("id",session()->get("id"))->get()->map(function($q){
            $q->academico = $q->trayecto->groupBy(["trayecto","trimestre"]);
            return $q;
        })->first();

        return Response::json( $data );
    }

    public function inscribir(Request $req){
        try {
            $c = trayecto::find($req->id);
            $c->inscripcion = $req->inscripcion;
            $c->save();
            
            return Response::json( ["msj"=>"¡Operación exitosa!"] );
        } catch (\Exception $e) {
            return Response::json( ["error"=>$e->getMessage()] );
        }
    }
   
   
   
    

  
   

   
   

    
   
}
