<?php

namespace App\Http\Controllers;

use App\personal;
use App\trayecto;
use App\carrera;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Auth\LoginController;

use Jenssegers\Date\Date;
use Response;
use PDF;

Date::setLocale('es');

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
        ->where("verificado","LIKE",$req->verificado)
        ->take($req->limit)
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
    public function modificar()
    {
        return view("estudiante.modificar");
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
        if (!personal::with("nombrecarrera")->find(session()->get("id"))->verificado&&(!personal::with("nombrecarrera")->find(session()->get("id"))->inscrito||$req->type==="update")) {
                
            try {
                $this->validate($req, [
                    'file_cedula' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,pdf',
                    'file_foto' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,pdf',
                    'file_notas' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,pdf',
                    'file_fondo_negro' => 'nullable|sometimes|image|mimes:jpeg,png,jpg,pdf',
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

                $personal->fecha_ingreso = date('Y-m-d');

                

                if ($personal->save()) {
                    

                    $path = "public/docsPersonal/".$personal->id;
                    $obj_files = personal::find($personal->id);
    
                    if ($req->hasFile('file_foto')) {
                        $obj_files->file_foto = str_replace("public","storage",$req->file('file_foto')->storeAs($path,"file_foto.".$req->file('file_foto')->extension()));
                    }
                    if ($req->hasFile('file_cedula')) {
                        $obj_files->file_cedula = str_replace("public","storage",$req->file('file_cedula')->storeAs($path,"file_cedula.".$req->file('file_cedula')->extension()));
                    }
                    if ($req->hasFile('file_notas')) {
                        $obj_files->file_notas = str_replace("public","storage",$req->file('file_notas')->storeAs($path,"file_notas.".$req->file('file_notas')->extension()));
                    }
                    if ($req->hasFile('file_fondo_negro')) {
                        $obj_files->file_fondo_negro = str_replace("public","storage",$req->file('file_fondo_negro')->storeAs($path,"file_fondo_negro.".$req->file('file_fondo_negro')->extension()));
                    }
                    if ($req->hasFile('file_sintesis')) {
                        $obj_files->file_sintesis = str_replace("public","storage",$req->file('file_sintesis')->storeAs($path,"file_sintesis.".$req->file('file_sintesis')->extension()));
                    }
                    $obj_files->save();

                }

                \App\Traits\RestoreSession::restoreSession($personal);
                
                return Response::json( ["estado"=>true,"msj"=>$req->type==="update"?"¡Modificación exitosa!":"¡Inscripción exitosa!"] );
            } catch (\Exception $e) {

                return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
            }
        }
    }
    public function validNota($materia)
    {   
        $estatus = "reprobado";
        $promedio = 0;

        if (!$materia) {
            return ["estatus" => $estatus, "promedio" => $promedio];
        }


        $escala = $materia->uc->escala;
        $notas = $materia->notas;

        foreach ($notas as $nota) {$promedio += $nota->puntos;}
        if (count($notas)) {
            $promedio = $promedio/count($notas);
        }

        $estatus = "";
        if ($promedio <= $escala->reprobado) {
            $estatus = "reprobado";
        }
        if ($promedio > $escala->reprobado && $promedio < $escala->especial) {
            $estatus = "repite";
        }
        if ($promedio >= $escala->especial && $promedio < $escala->aprobado) {
            $estatus = "especial";
        }
        if ($promedio >= $escala->aprobado) {
            $estatus = "aprobado";
        }
        return ["estatus"=>$estatus,"promedio"=>$promedio];
    }
    public function academico()
    {
        $data = personal::with(["trayecto"=>function($q){
            $q->with(["notas"=>function($q){
                $q->orderBy("created_at","desc");
            },"profesor","uc"=>function($q){
                $q->with(["prela"=>function($q){$q->with("uc");},"escala","categoria"=>function($q){$q->with("carrera");}]);
            },"seccion"]);
        },"nombrecarrera"])->where("id",session()->get("id"))->get()->map(function($q){
            if ($q->verificado) {


                $q->trayecto->map(function($t) use ($q) {
                    $t->se_puede_inscribir = true;
                    $inscripcion_motivo = [];
                    
                    $t->estatus = $this->validNota($t)["estatus"];
                    $t->promedio = $this->validNota($t)["promedio"];

                    foreach ($t->uc->prela as $prelacion) {
                        $materia = $q->trayecto->where("id_uc",$prelacion->uc->id)->first();

                        $estatus = $this->validNota($materia)["estatus"];
                        $promedio = $this->validNota($materia)["promedio"];

                        if ($estatus!=="aprobado") {
                            $t->se_puede_inscribir = false;
                            $mensaje = " La materia ".$prelacion->uc->nombre." ( $estatus: $promedio ) prela a ".$t->uc->nombre.".";
                            array_push($inscripcion_motivo, $mensaje);
                        }
                    }

                    $t->inscripcion_motivo = $inscripcion_motivo;
                });

                $q->academico = $q->trayecto->groupBy(["trayecto","trimestre","seccion.nombre","uc.nombre"]);



            }else{
                $q->academico = [];
            }
            return $q;
        })->first();


       



        return Response::json( $data );
    }
    public function certificacion(Request $req)
    {
        Date::setLocale('es');

        $data = personal::with(["trayecto"=>function($q) use ($req){

            $q->with(["notas"=>function($q){
                $q->orderBy("created_at","desc");
            },"profesor","uc"=>function($q){
                $q->with(["prela"=>function($q){$q->with("uc");},"escala","categoria"=>function($q){$q->with("carrera");}]);
            },"seccion"])
            ->where("trimestre",$req->id_trimestre)
            ->where("trayecto",$req->id_trayecto);

        },"nombrecarrera"])->find(session()->get("id"));


        if ($data) {
            
            // return $data; 
            return view("reporte.academico", $data);

            $pdf = PDF::loadView('reporte.academico', $data);
            return $pdf->download('academico - '.$data->cedula." ".$req->id_trayecto.'_'.$req->id_trimestre."_".Date::parse(date("Y-m-d"))->format('l, j \de F Y').'.pdf');
        }else{
            return "¡No encontrado!";
        }
    }
    public function constancia(Request $req)
    {
        $d  = personal::with(["nombrecarrera"])->find(session()->get("id"));

        $document = new \PhpOffice\PhpWord\TemplateProcessor(storage_path('constancia_estudiante.docx'));
        
        $document->setValue("nombre",$d->nombre);
        $document->setValue("apellido",$d->apellido);
        $document->setValue("cedula",formatCedula($d->cedula));
        $document->setValue("nacionalidad",$d->nacionalidad);

        $document->setValue("nombrecarrera",$d->nombrecarrera->nombre);
        $document->setValue("fecha_inscripcion",$newDate = date("d-m-Y", strtotime($d->fecha_ingreso)));


        $document->setValue("nombrecarrera",$d->nombrecarrera->nombre);


        $document->setValue("trayecto","trayecto");
        $document->setValue("trimestre","trimestre");
        $document->setValue("inicio_trayecto","inicio_trayecto");
        $document->setValue("cierre_trayecto","cierre_trayecto");
        $document->setValue("fecha_hoy",Date::parse(date("Y-m-d"))->format('j \de F Y'));

        

        

        
        
        




        header('Content-Type: application/msword');
        header('Content-Disposition: attachment;filename="'. "Constancia de estudio ".$d->cedula.".docx" .'"');
        header('Cache-Control: max-age=0');
        $document->saveAs('php://output');
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
