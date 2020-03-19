<?php

namespace App\Http\Controllers;

use App\sno_unidad_tributaria;
use App\sno_formulas_asignadas;
use App\sno_formulas_versiones;
use App\sno_ut_asignada;
use App\sno_formulas;
use App\sno_nominas;
use App\sno_sueldos;
use App\sno_tablas_sueldos;
use App\sno_tablas_sueldos_asignado;
use App\personal;

use App\Adic_personal;
use App\Adic_formula;
use App\Divisiones_formula;

use Illuminate\Http\Request;

class infoNominaController extends Controller
{
    public function index($id_nomina)
    {
        $formulas = sno_formulas::with([
            'versiones' => function($q) use ($id_nomina){
                $q->whereIn("id",function($q) use ($id_nomina){
                    $q->from("sno_formulas_asignadas")
                    ->where("id_nomina",$id_nomina)
                    ->select("id_formula");
                })->orderBy("fecha","asc");

                $q->orWhereIn("id",function($q) use ($id_nomina){
                    $q->from("adic_formulas")
                    ->where("id_nomina",$id_nomina)
                    ->select("id_formula");
                })->orderBy("fecha","asc");
            },
            "condiciones" => function($q){
                $q->with("valorall");
            },
        ])->whereIn("id",function($q) use ($id_nomina){
            $q->from("sno_formulas_versiones")->whereIn("id",function($q) use ($id_nomina){
                $q->from("sno_formulas_asignadas")
                ->where("id_nomina",$id_nomina)
                ->select("id_formula");
            })
            ->select("id_formula");
        })
        ->orWhereIn("id",function($q) use ($id_nomina){
            $q->from("sno_formulas_versiones")->whereIn("id",function($q) use ($id_nomina){
                $q->from("adic_formulas")
                ->where("id_nomina",$id_nomina)
                ->select("id_formula");
            })
            ->select("id_formula");
        })
        ->orderByRaw("tipo_concepto='prima salarial' AND tipo_sueldo='sueldo basico' DESC")
        ->get();
        return $formulas;
    }
}

