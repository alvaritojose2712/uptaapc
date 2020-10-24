<?php

namespace App\Http\Controllers\Auth;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Auth;
use Hash;
use App\personal;
use Response;

class LoginController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except(['logout','getAuthId',"getCenso"]);
    }

    public function getCenso(Request $req)
    {
        $regulares = personal::with(["nombrecarrera"])
        ->where("role",3)
        ->whereIn("carrera",function($q){
            $q->from("carreras")->where("proximamente",0)->select("id");
        })
        ->get()->groupBy("nombrecarrera.nombre");

        $proxi = personal::with(["nombrecarrera"])
        ->where("role",3)
        ->whereIn("carrera",function($q){
            $q->from("carreras")->where("proximamente",1)->select("id");
        })
        ->get()->groupBy("nombrecarrera.nombre");

        return view("admin.carrera.censo",compact("regulares","proxi"));
    }
    
    public function logout(Request $request)
    {
        $request->session()->flush();

        return redirect('/sinapsis');
    }


    public function showLoginForm()
    {
        return view('auth.login');
    }

   
    public function login(Request $req)
    {
        try {

           
            $d = personal::with("nombrecarrera")->where("cedula","=",$req->username)->orWhere("correo","=",$req->username)->first();
            
            if ($d&&Hash::check($req->pass, $d->password)) {
                \App\Traits\RestoreSession::restoreSession($d);
                
                $estado = $this->selectRedirect();
            }else{
                throw new \Exception("¡Datos Incorrectos!", 1);
                
            } 
            
            return Response::json( ["estado"=>true,"msj"=>"¡Inicio exitoso! Bienvenido/a, ".$d->nombre] );
        } catch (\Exception $e) {
            return Response::json( ["estado"=>false,"error"=>$e->getMessage()] );
        }
        
        
        return Response::json(["estado"=>$estado,"user"=>$d]);
    }


    public function selectRedirect()
    {
      $selectRedirect = "/";
        switch(session("role")){
            case 1:
                $selectRedirect = '/admin';
                break;
            case 2:
                $selectRedirect = '/profesor';
                break;
            case 3:
                $selectRedirect = '/estudiante';
                break;
            default:
                $selectRedirect = '/login';
        }
      return $selectRedirect;
         
        // return $next($request);
    } 
    public function getAuthId(Request $req)
    {
        if (session()->has('role')) {
            return Response::json(personal::with("nombrecarrera")->find(session()->get("id")));
        }
        
    }

    
}
