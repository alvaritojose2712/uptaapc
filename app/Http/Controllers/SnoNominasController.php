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
use App\sno_condiciones_nomina;


use App\Adic_personal;
use App\Adic_formula;
use App\Divisiones_formula;

use Illuminate\Http\Request;
use Response;
use Illuminate\Support\Facades\Input;
use \jlawrence\eos\Parser;
class SnoNominasController extends Controller
{
        
    public function filtro($v1,$operador,$v2){
        if ($operador === "igual") {
            if ($v1==$v2) return true;
        }
        else if ($operador === "diferente") {
            if ($v1!=$v2) return true;
        }
        else if ($operador === "menor") {
            if ($v1<$v2) return true;
        }
        else if ($operador === "mayor") {
            if ($v1>$v2) return true;
        }
        return false;   
    }
    public function condicion($persona,$condiciones,&$hijos)
    {       
        $unicos_p = [];
        $unicos_h = [];
        foreach ($condiciones as $e) {
            if ($e->type==0) {
                $campo = $e["valorall"]["campo"];
                if(!array_key_exists($campo,$unicos_p)) $unicos_p[$campo] = false;
                $operador = $e["operador"];
                $v1 = $e["valorall"]["valor"];
                $v2 = $persona[$campo];
                if (!$unicos_p[$campo]&&$this->filtro($v1,$operador,$v2)) $unicos_p[$campo] = true;
            }else{
                if (isset($unicos_h[$e->campo])) {
                    array_push($unicos_h[$e->campo],$e->valor);
                }else{
                    $unicos_h[$e->campo] = [$e->valor];
                }
            }
        }
        $h = 0;
        if (count($unicos_h)) {
            foreach ($persona->hijos as $hijo) {
                $is_valid = true;
                foreach($unicos_h as $campo => $valores){
                    $camp = false;
                    foreach($valores as $valor){
                        if ($hijo[$campo]==$valor) {
                            $camp = true;
                            break;
                        }
                    };
                    if (!$camp) {
                        $is_valid = false;
                        break;
                    }   
                };
                if ($is_valid) ++$h;
            }
        }
        $hijos = $h;
        $pass = true;
        foreach ($unicos_p as $e) {
            if(!$e) {
                $pass = false;
                break;
            }
        };
        return $pass;
    }
    /*public function fechas_count($obj,$arr = null){
        $date_and_days = [];
            $fechas = [];
            if($arr!==null){
                $fechasDB = $arr;
            }else{
                $fechasDB = $obj->whereBetween("fecha",[$this->inicio,$this->cierre])->distinct()->get(['fecha']);
            }
            
            array_push($fechas, $this->inicio);
            foreach($fechasDB as $e) {array_push($fechas, $e['fecha']);}
            array_push($fechas, $this->cierre);
            $fechas = array_unique($fechas);
            usort($fechas,function( $a, $b ) {return strtotime($a) - strtotime($b);});
            $anterior = NULL;
            $count = 0;
            foreach ($fechas as $i => $fecha) {
                if ($anterior !== NULL) {
                    $f = (new \DateTime($fecha))->modify('-1 day');
                    if($i==count($fechas)-1){$f = $fecha;}
                    $dias = s_datediff("d",$anterior,$f);
                    $count += $dias;
                    array_push($date_and_days, [$anterior,$count]); 
                }
                $anterior = $fecha;
            }
            $date_and_days[0][0] = $obj->where("fecha","<=",$this->inicio)->orderBy("fecha","desc")->first()->fecha;
        return $date_and_days;
    }*/
    public function fechas_count($arr,$formulas = NULL,$model){
        // return $arr;
        $cierre = new \DateTime($this->cierre);
        $inicio = new \DateTime($this->inicio);

        $date_and_days = [];
        $fechas = [];
        $fechasDB = [];
        if($formulas!==NULL){
            foreach ($formulas as $e) {
                array_push($fechasDB,["fecha"=>$e->fecha,"id"=>$e->id]);
            }
        }else{
            foreach ($arr as $e) {
                array_push($fechasDB,["fecha"=>$e->tabla->fecha,"id"=>$e->tabla->id]);
            }
        }
        usort($fechasDB,function( $a, $b ) {return strtotime($a['fecha']) - strtotime($b['fecha']);});
        if (count($fechasDB)&&(new \DateTime($fechasDB[0]["fecha"]))>$inicio) {
            throw new \Exception("Error: Inicio del rango está atrasado -> ".$fechasDB[0]['id']." -> ".$model, 1);
        }
        if(!count(array_filter($fechasDB,function($e)use($inicio){
            return (new \DateTime($e['fecha']))==$inicio;
        }))){
            array_push($fechasDB,["fecha"=>$this->inicio,"id"=>NULL]);
        }
        if(!count(array_filter($fechasDB,function($e)use($cierre){
            return (new \DateTime($e['fecha']))==$cierre;
        }))){
            array_push($fechasDB,["fecha"=>$this->cierre,"id"=>NULL]);
        }
        usort($fechasDB,function( $a, $b ) {return strtotime($a['fecha']) - strtotime($b['fecha']);});

        $anterior = NULL;
        foreach ($fechasDB as $i => $e) {
            if ($anterior !== NULL) {
                if($e['id']===NULL){
                    $fechasDB[$i]['id'] = $e['id'] = $anterior['id'];
                }
            }
            $anterior = $e;
        }
        // return $fechasDB;
        // print_r($fechasDB);
        $anterior = NULL;
        foreach ($fechasDB as $i => $e) {
            if ($anterior !== NULL) {
                $f_actual = new \DateTime($e['fecha']);
                if($f_actual>=$inicio){
                    array_push($fechas,$e);
                    if($f_actual==$cierre){break;}
                }
            }
            $anterior = $e;
        }
        // return $fechas;
        $anterior = NULL;
        $count = 0;
        foreach ($fechas as $i => $fecha) {
            if ($anterior !== NULL) {
                $f = (new \DateTime($fecha['fecha']))->modify('-1 day');
                if($i===count($fechas)-1){$f = $fecha['fecha'];}//No tocar
                $dias = s_datediff("d",$anterior['fecha'],$f);
                $count += $dias;
                array_push($date_and_days, [$anterior['fecha'],$count,$anterior["id"]]); 
            }
            $anterior = $fecha;
        }
        return $date_and_days;
    }
    public function get_id_range($arr,$diaQueCorre){
        $diasTopAnterior = null;
        foreach ($arr as $actual) {
            $diasTop = $actual[1];
            // return $arr;
            if ($diasTopAnterior!==null) {
                // id = $actual[2];
                if ($diasTopAnterior<$diaQueCorre&&$diaQueCorre<=$diasTop) {return $actual[2];}
                //Si el día que corre es menor o igual al primer item del array, retorna el id de éste.
            }
            if($diaQueCorre<=$arr[0][1]){return $arr[0][2];}
            $diasTopAnterior = $diasTop;
        }
    }
    
    public function index(Request $req)
    {
        return view("recursos_humanos.nomina.lista");
    }

    public function items(Request $req)
    {
        $data = sno_nominas::orWhere("id","LIKE",$req->q."%")
        ->orWhere("denominacion","LIKE",$req->q."%")
        ->orWhere("fecha","LIKE",$req->q."%")
        ->get();

        return view("recursos_humanos.nomina.items",compact("data"));   
    }
    public function prerunnomina(Request $req)
    {
        return view("recursos_humanos.nomina.prerun",$this->getParametersNomina($req->id_nomina));
    }
    public function getParametersNomina($id_nomina)
    {
        $formulas = $this->returnFormulas($id_nomina);
        $divisionesFormulas = $this->returnDivisioneFormulas($id_nomina);
        $nomina = $this->returnDataNomina($id_nomina);

        $PersonalCondiciones = $this->returnPersonalCondiciones(
            $this->nominaCondiciones($nomina->condiciones)
        );
        $PersonalAdicional = $this->returnPersonalAdicional($nomina->adic_personal);
        $TablaSueldo = $this->returnTablaSueldo($id_nomina);
        $returnUt = $this->returnUt($id_nomina);
        $returnFormuAsig = $this->returnFormuAsig($id_nomina);


        return [
            "id_nomina" => $id_nomina,
            "formulas" => $formulas,
            "divisionesFormulas" => $divisionesFormulas,
            "nomina" => $nomina,

            "PersonalCondiciones"=>$PersonalCondiciones,
            "PersonalAdicional"=>$PersonalAdicional,
            "adic_formula"=>$nomina->adic_formula,
            "TablaSueldo"=>$TablaSueldo,
            "returnUt"=>$returnUt,
            "returnFormuAsig"=>$returnFormuAsig,

        ];
    }
    public function getParametersNominajson(Request $req)
    {
        return Response::json($this->getParametersNomina($req->id_nomina));
    }
    public function configNomina($id_nomina)
    {
        return view("recursos_humanos.nomina.config",["id_nomina"=>$id_nomina]);
    }
    public function create()
    {
        return view("recursos_humanos.nomina.crear");
    }

    public function store(Request $req)
    {
        // return $req->all();
        try {
                    
            $nomina = new sno_nominas;
            $nomina->denominacion = $req->inputDenominacionNomina;
            $nomina->fecha = date("Y-m-d");
            $nomina->periodo = $req->selectNomPeri;
            $nomina->save();
            $id = $nomina->id;

            foreach ($req->condicionesPersona as $e) {
                $condicionesPersona = new sno_condiciones_nomina;
                $condicionesPersona->valor = $e["valor"];
                $condicionesPersona->id_nomina = $id;
                $condicionesPersona->save();
            }

            foreach ($req->selectPersona as $e) {
                $selectPersona = new Adic_personal;
                $selectPersona->cedula = $e["cedula"];
                $selectPersona->incluir_excluir = $req->incluir_excluir;
                $selectPersona->id_nomina = $id;
                $selectPersona->save();
            }

            foreach ($req->utSelect as $e) {
                $utSelect = new sno_ut_asignada;
                $utSelect->id_ut = $e["id"];
                $utSelect->id_nomina = $id;
                $utSelect->save();
            }

            foreach ($req->sueldosSelect as $e) {
                $sueldosSelect = new sno_tablas_sueldos_asignado;
                $sueldosSelect->id_tabla_sueldo = $e["id"];
                $sueldosSelect->id_nomina = $id;
                $sueldosSelect->save();
            }

            foreach ($req->formulasSelect as $e) {
                if (count($e["solo"])) {
                    foreach ($e["solo"] as $ee) {
                        $solo = new Adic_formula;
                        $solo->cedula = $ee;
                        $solo->id_formula = $e["id"];
                        $solo->id_nomina = $id;
                        $solo->save();
                    }
                }else{
                    $formulasSelect = new sno_formulas_asignadas;
                    $formulasSelect->id_formula = $e["id"];
                    $formulasSelect->id_nomina = $id;
                    $formulasSelect->save();
                }
                foreach ($e["divisiones"] as $ee) {
                    $divi = new Divisiones_formula;
                    $divi->id_formula = $e["id"];
                    $divi->id_division = $ee["id"];
                    $divi->id_nomina = $id;
                    $divi->save();
                }
            }
            

            return Response::json( ["message"=>"Éxito al crear"] );

            // $nomina->condiciones();
            // return Response::json( $req->all() );
        } catch (\Exception $e) {
            return Response::json( ["err"=>$e->getMessage()] );
            
        }

        
        // $req->selectPersona 
        // $req->formulasSelect 
        // $req->sueldosSelect 
        // $req->utSelect    
    }
    
    function validateDate($date, $format = 'Y-m-d')
    {
        $d = \DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) === $date;
    }
    public function returnFormulas($id_nomina)
    {
        return sno_formulas::with([
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
    }
    public function returnFormuAsig($id_nomina)
    {
        $arr = [];
        foreach ($this->returnDataNomina($id_nomina)->adic_formula->unique("id_formula") as $e) {
            array_push($arr, $e);
        }
        foreach (sno_formulas_asignadas::with(["formula"=>function($q){
            $q->with(["denominacion"]);
        }])->where("id_nomina",$id_nomina)->get() as $e) {
            array_push($arr, $e);
        }

        return $arr;
    }
    public function returnDataNomina($id_nomina)
    {
        return sno_nominas::with([
            "condiciones" => function($q){
                $q->with(["valorall"]);
            },
            "adic_formula"=> function($q){
                $q->with(["formula"=>function($q){
                    $q->with("denominacion");
                }]);
            },
        "adic_personal"])->where("id",$id_nomina)->first();
    }
    public function returnDivisioneFormulas($id_nomina)
    {
        return Divisiones_formula::where("id_nomina",$id_nomina)->with(["division","formula"=>function($q){
            $q->with("denominacion");
        }])->get();
    }
    public function returnPersonalCondiciones($condicionesnomina)
    {
        if (!count($condicionesnomina)) {
            return [];
        }
        return personal::with(["hijos"])
        ->where(function($q) use ($condicionesnomina){
            foreach ($condicionesnomina as $campo => $arr) {
                $q->where(function($qq) use ($arr,$campo){
                    foreach ($arr as $e) {
                        $qq->orWhere($campo,$e);
                    }
                });
            }
        })
        ->orderBy("id","desc")
        ->get();
    }
    public function returnPersonalAdicional($adicPersonal)
    {
        if (!count($adicPersonal)) {
            return [];
        }
        return personal::with(["hijos"])
        ->where(function($q) use ($adicPersonal){
            foreach($adicPersonal as $e) {
                $operador = $e->incluir_excluir==1?"=":"!=";
                $q->orWhere('cedula', $operador, $e->cedula);
            }
        })
        ->orderBy("id","desc")
        ->get();
    }
    public function returnTablaSueldo($id_nomina)
    {
        return sno_tablas_sueldos_asignado::where("id_nomina",$id_nomina)->with("tabla")->get();
    }
    public function returnUt($id_nomina)
    {
        return sno_ut_asignada::where("id_nomina",$id_nomina)->with("tabla")->get();
    }
    public function nominaCondiciones($arr)
    {
        $condicionesnomina = [];
        foreach ($arr->map(function($q){
            return ["valor"=>$q->valorall->valor,"campo"=>$q->valorall->campo];
        }) as $e) {
            if(isset($condicionesnomina[$e["campo"]])){
                array_push($condicionesnomina[$e["campo"]],$e["valor"]);
            }else{
                $condicionesnomina[$e["campo"]] = [$e["valor"]];
            }
        }
        return $condicionesnomina;
    }
    public function show(Request $req, $id,$inicio,$cierre,$unique=null)
    {
        if (!$this->validateDate($inicio) || !$this->validateDate($cierre)) {
            throw new \Exception("Error: Fechas incorrectas", 1);
        }
        $id_nomina = $id;
        // $this->inicio = "2019-01-01";
        // $this->cierre = "2019-01-31";
        $this->inicio = $inicio;
        $this->cierre = $cierre;
        /*
            _Variables_
            UTRIBUTARIA
            LUNES
            NHIJOS
            SUELDO
            SUELDONORMAL
            SUELDOINTEGRAL
            ANTIGUEDAD

        
            $condiciones = [
                [
                    "id_formula" => 1, 
                    "valor" => ["valor"=>"ACTIVO","campo"=>"estado"], 
                    "operador" => "igual"
                ],
                [
                    "id_formula" => 1, 
                    "valor" => ["valor"=>"JUBILADO","campo"=>"estado"], 
                    "operador" => "igual"
                ],
            ];
            $persona = [
                "estado" => "JUBILAD",
                "categoria" => "DOCENTE",
                "estatus" => "CONTRATADO",
            ];
        */
        
        //Días entre fecha y fecha
        if ((new \DateTime($cierre))<=(new \DateTime($inicio))) {
            throw new \Exception("Error: Fecha cierre no puede ser menor o igual a Fecha inicio", 1);
            
        }
        $diasPeriodo = s_datediff("d",$inicio,$cierre); 

        $formulas = $this->returnFormulas($id_nomina);
        $divisionesFormulas = $this->returnDivisioneFormulas($id_nomina);
        $nomina = $this->returnDataNomina($id_nomina);

        $fechas_sueldos = $this->fechas_count($this->returnTablaSueldo($id_nomina),NULL,"sno_tablas_sueldos_asignado");
        $fechas_ut = $this->fechas_count($this->returnUt($id_nomina),NULL,"sno_ut_asignada");
        $fechas_formulas = [];
        foreach ($formulas as $e) {
            array_push($fechas_formulas,$this->fechas_count(NULL,$e->versiones,"fórmulas"));
        }
        // return $fechas_formulas;

        $utQuery = sno_unidad_tributaria::whereIn("id",array_map(function($e){return $e[2];},$fechas_ut))->orderBy("fecha","asc")->get();
        $sueldosQuery = sno_tablas_sueldos::with("sueldos")->whereIn("id",array_map(function($e){return $e[2];},$fechas_sueldos))->orderBy("fecha","asc")->get();

        $dates_and_days = [];
        foreach ($fechas_formulas as $fechas_formula) {
            $f = [];
            for ($i=1; $i <= $diasPeriodo; $i++) { 
                $fSueldo = $this->get_id_range($fechas_sueldos,$i);
                $fUt = $this->get_id_range($fechas_ut,$i);
                $fFormula = $this->get_id_range($fechas_formula,$i);
                $check = true;
                foreach($f as $ii => $e){
                    if ($e[1]==$fSueldo&&$e[2]==$fUt&&$e[3]==$fFormula) {
                        $f[$ii][0] += 1;
                        $check = false;
                        break;
                    }
                };
                if($check){array_push($f,[1,$fSueldo,$fUt,$fFormula]);}
            }
            array_push($dates_and_days,$f);
        }
        // return $dates_and_days;

        //Seleccionar personal de acuerdo a las condiciones Nómina y el Personal adicional

        $PersonalCondiciones = $this->returnPersonalCondiciones(
            $this->nominaCondiciones($nomina->condiciones)
        );
        $PersonalAdicional = $this->returnPersonalAdicional($nomina->adic_personal);
        $adicFormulas =  $nomina->adic_formula;

        $personal = $PersonalCondiciones->concat($PersonalAdicional)->unique();
       
        if ($unique) { $personal = $personal->where("id",$unique);  }
        
        
        // return personal::with(["hijos"])
        // ->orWhere(function($q) use ($adicPersonal){
        //     foreach($adicPersonal as $e) {
        //         $operador = $e->incluir_excluir==1?"=":"!=";
        //         $q->orWhere('cedula', $operador, $e->cedula);
        //     }
        // })
        // ->orWhere(function($q) use ($condicionesnomina){
        //     foreach ($condicionesnomina as $campo => $arr) {
        //         $q->where(function($qq) use ($arr,$campo){
        //             foreach ($arr as $e) {
        //                 $qq->orWhere($campo,$e);
        //             }
        //         });
        //     }
        // })
        // ->orderBy("id","desc")
        // ->get();
        $recibos = [];
        foreach($personal as $persona){
            $antiguedad = s_datediff("y",(new \DateTime($persona->fecha_ingreso)),(new \DateTime()));

            $sueldo = 0;
            $sueldoNormal = 0;
            $sueldoIntegral = 0;
            $lunes = lunes();
            $hrs_nocturnas = $persona->hrs_nocturnas;
            $hrs_feriadas = $persona->hrs_feriadas;
            $hrs_diurnas = $persona->hrs_diurnas;
            $hrs_feriadas_nocturnas = $persona->hrs_feriadas_nocturnas;
            $hijos = 0;

            $categoria = $persona->categoria;
            $cargo = $persona->cargo;
            $dedicacion = $persona->dedicacion;

            // return $dates_and_days;
            $recibo_persona = [];
            foreach ($formulas as $i_f => $f) {
                if ($this->condicion($persona,$f->condiciones,$hijos)) {
                    $versiones = $f->versiones;
                    $diasF = $f->dias;
                    $versiones_recibo = [];
                    foreach ($dates_and_days[$i_f] as $arr_days) {
                                                    // $arr_days[0] //dias
                                                    // $arr_days[1] //sueldo
                                                    // $arr_days[2] //ut
                                                    // $arr_days[3] //formulas
                        if(//Condicional para que no se calcule doble si la formula adicional y la formula asignada son la misma //PRIMERA IMPRESION
                        count($adicFormulas->where("id_formula",$arr_days[3])->where("cedula",$persona->cedula)) 
                        OR 
                        !count($adicFormulas->where("id_formula",$arr_days[3]))
                        ){
                            $sueldo = $sueldosQuery->where("id",$arr_days[1])
                            ->first()
                            ->sueldos
                            ->where("categoria",$categoria)
                            ->where("cargo",$cargo)
                            ->where("dedicacion",$dedicacion)->first()->salario;
                            $ut = $utQuery->where("id",$arr_days[2])->first()->valor;
                            $formula_version = $versiones->where("id",$arr_days[3])->first();
                            
                            $vars = [
                                "LUNES" => "\$lunes",
                                "UTRIBUTARIA" => "\$ut",
                                "NHIJOS" => "\$hijos",
                                "SUELDO" => "\$sueldo",
                                "SUELDONORMAL" => "\$sueldoNormal",
                                "SUELDOINTEGRAL" => "\$sueldoIntegral",
                                "ANTIGUEDAD" => "\$antiguedad",
                                "HRSNOCTURNAS" => "\$hrs_nocturnas",
                                "HRSFERIADAS" => "\$hrs_feriadas",
                                "HRSDIURNAS" => "\$hrs_diurnas",
                                "HRSFERIADASNOCTURNAS" => "\$hrs_feriadas_nocturnas",
                            ];
                            $formula = $formula_version->formula;
                            foreach ($vars as $replace => $valor) {
                                $formula = str_replace($replace,$valor,$formula);
                            }
                            try {
                                $calc = eval('return '.$formula.';');
                                if(!is_numeric($calc)){
                                    throw new \Exception();
                                }
                            } catch (\Throwable $th) {
                                throw new \Exception("Error: Fórmula incorrecta -> id = ".$formula_version->id." valor -> ".$formula, 1);
                            }
                            
                            
                            $calc = ($calc/$diasF)*$arr_days[0];

                            // Sueldo normal
                            if (
                                ($f->movimiento==="asignacion" && $f->tipo_concepto==="prima salarial") 
                                OR $f->tipo_concepto==="bono salarial"
                            ) {
                                $sueldoNormal+=$calc;   
                            }
                            //Sueldo integral
                            if (
                                $f->movimiento==="asignacion" 
                                && $f->tipo_concepto==="bono anual" 
                                && $f->tipo_sueldo=="sueldo normal"
                            ) {
                                $sueldoIntegral+=$calc/12;
                            }
                            
                            $division = [
                                ["id"=>"_total","nombre" => "Total período", "monto" => $calc],
                            ];
                            $divisiones_formula = $divisionesFormulas->where("id_formula",$arr_days[3]);
                            if(count($divisiones_formula)){
                                
                                $porcentaje = 0;
                                foreach($divisiones_formula as $e){
                                    $porcentaje += $e->division->porcentaje;
                                    $result = $calc*($e->division->porcentaje/100);
                                    array_push($division,[
                                        "id"=>$e->division->id,
                                        "nombre" => $e->division->denominacion,
                                        "monto" => $result
                                    ]);
                                };

                                if($porcentaje!=100){
                                    throw new \Exception("Error: Divisiones de Fórmula -> id = ".$formula_version->id." debe sumar el 100%", 1);
                                }
                                
                            };
                            array_push($versiones_recibo,[

                                "monto" => $division,
                                "diasCorrespondientes" => $arr_days[0],
                                "formula_id" => $formula_version->id,
                                "formula_fecha" => $formula_version->fecha,
                                "formula" => $formula,
                                "SUELDO" => $sueldo,
                                "UTRIBUTARIA" => $ut,
                                "LUNES" => $lunes,
                                "NHIJOS" => $hijos,
                                "SUELDONORMAL" => $sueldoNormal,
                                "SUELDOINTEGRAL" => $sueldoIntegral,
                                "ANTIGUEDAD" => $antiguedad,
                                "HRSNOCTURNAS" => $hrs_nocturnas,
                                "HRSFERIADAS" => $hrs_feriadas,
                                "HRSDIURNAS" => $hrs_diurnas,
                                "HRSFERIADASNOCTURNAS" => $hrs_feriadas_nocturnas,
                                "ID_sueldo" => $arr_days[1],
                                "ID_ut" => $arr_days[2],
                                "ID_formula" => $arr_days[3],
                            ]);
                        }
                        
                    };
                    
                    if(count($versiones_recibo)){
                        $recibo_persona[$i_f] = [];
                        $recibo_persona[$i_f]["descripcion"] = $f->descripcion;
                        $recibo_persona[$i_f]["movimiento"] = $f->movimiento;
                        $recibo_persona[$i_f]["versiones"] = $versiones_recibo;
                    }
                    
                }
            }
            $persona->recibo = $recibo_persona;
            array_push($recibos,$persona);
        };
        $allDivi = $divisionesFormulas->unique('division')->map(function ($e) {
            return $e->division;
        });
        $allDivi->push(array('id' =>"_total" , 'denominacion' =>"Total período" ));
        // return $allDivi;
        $datos = [
                "data"=>$recibos,
                "nomina"=>$nomina,
                "inicio"=>$inicio,
                "cierre"=>$cierre,
                "divisiones"=> $allDivi,
                "id_division"=>$req->id_division //Para seleccionar una unica división
            ];
        $vista = "";
        switch ($req->modo) {
            case 'general':
                $vista = "index";
                break;
            
            case 'recibo':
                $vista = "recibo";
                break;
            default :
            return $datos;
        }
        return view("recursos_humanos.nomina.".$vista, $datos);
        // return view("recursos_humanos.nomina.procesarNomina")->with('recibos',$recibos);
    }
    public function update(Request $req)
    {
        return Response::json($req->all());
    }
    public function destroy(Request $req)
    {
        sno_nominas::find($req->id_nomina)->delete();
        return back()->with(["msj"=>"Nómina eliminada"]);
    }
}
