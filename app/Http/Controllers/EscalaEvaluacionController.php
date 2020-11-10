<?php

namespace App\Http\Controllers;

use App\escala_evaluacion;
use Illuminate\Http\Request;

class EscalaEvaluacionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return escala_evaluacion::all();
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
     * @param  \App\escala_evaluacion  $escala_evaluacion
     * @return \Illuminate\Http\Response
     */
    public function show(escala_evaluacion $escala_evaluacion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\escala_evaluacion  $escala_evaluacion
     * @return \Illuminate\Http\Response
     */
    public function edit(escala_evaluacion $escala_evaluacion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\escala_evaluacion  $escala_evaluacion
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, escala_evaluacion $escala_evaluacion)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\escala_evaluacion  $escala_evaluacion
     * @return \Illuminate\Http\Response
     */
    public function destroy(escala_evaluacion $escala_evaluacion)
    {
        //
    }
}
