<?php

namespace App\Http\Controllers;

use App\admin;
use App\profesor;
use App\estudiante;
use App\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function returnClass($t)
    {
        switch ($t) {
            case 'aspirante':
                return new estudiante;
                break;
            case 'profesor':
                return new profesor;
                break;
        }
    }
    public function verificarCuenta($t){
        return view("admin.verificar.verificarCuenta",["t"=>$t]);
    }
    public function verificarCuentaItems(Request $request,$t)
    {
       
        $data = $this->returnClass($t)::with("user")->orwhere("cedula","LIKE",$request->q."%")
        ->orwhere("nombres","LIKE",$request->q."%")
        ->orwhere("apellidos","LIKE",$request->q."%")
        ->take($request->numresultados)->get();
               
        return view("admin.verificar.itemsSearch",compact("data"));
        # code...
    }
    public function verificarCuentaProcesar(Request $request)
    {
        $user = User::find($request->id);
        $user->verificado = $request->val?0:1;
        $user->save();
        
    }
    public function verificarCuentaShow(Request $request,$t)
    {
        $data = $this->returnClass($t)::with(["user"=>function($q){
            $q->with("nombreCarrera");
        }])->find($request->id);
        return view("admin.verificar.showOne",compact("data"));
    }
    public function verificarCuentaDelete(Request $request)
    {
        $data = User::find($request->id)->delete();
    }
    
    public function index()
    {
        return view("admin.dashboard");
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function show(admin $admin)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function edit(admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(admin $admin)
    {
        //
    }
}
