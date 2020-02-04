<style type="text/css">
    table{
        width: 100%;
    }
    th,td{
        padding: 5px;
    }
    
</style>
<div>

    <div class="row">
        <div class="col">
            <div class="wrap-input100 validate-input" data-validate="">
                <input class="input100" type="text" name="estracto_soc" value="{{ $data->estracto_soc }}">
                <span class="focus-input100"></span>
                <span class="label-input100">Estrato Socioeconómico</span>
            </div>
        </div>
        <div class="col">
            <div class="wrap-input100 validate-input" data-validate="">
                <input class="input100" type="text" name="puntaje" value="{{ $data->puntaje }}">
                <span class="focus-input100"></span>
                <span class="label-input100">Puntaje</span>
            </div>
        </div>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">(*) 1. DATOS ACADÉMICOS</h2></div>
    <div class="row">
        <div class="col">
            <h5>Programa de Formación</h5>
            <h3>{{ $data->pnf }}</h3>
        </div>
        <div class="col border-left">
            <h5>Trimestre</h5>
            <h3>{{ $data->trimestre }}</h3>
        </div>
    </div>
    <hr>    
    <div class="form-group w-75">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="aicon" value="{{ $data->aicon }}">
            <span class="focus-input100"></span>
            <span class="label-input100">AICON</span>
        </div>
    </div>
    <div class="p-3">
        <h5>Mes y Año de ingreso a la Institución</h5>
    </div>
    <div class="row">
        <div class="col">
            <h3>{{ $data->mes_ingreso }}</h3>
        </div>
        <div class="col border-left">
            <h3>{{ $data->ano_ingreso }}</h3>
            
        </div>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">(*) 2. DATOS DE REFERENCIA</h2></div>
    <div class="form-group w-75">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="date" name="f_entrevista" value="{{ $data->f_entrevista }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Fecha de la entrevista</span>
        </div>
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="n_a_entrevistador" value="{{ $data->n_a_entrevistador }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Nombres y Apellidos de la persona entrevistada</span>
                </div>
            </div>
            <div class="col border-left">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100 numero" type="text" name="cedula_entrevistador" value="{{ $data->cedula_entrevistador }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Cédula de Identidad</span>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="parentesco" value="{{ $data->parentesco }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Parentesco</span>
        </div>
    </div>
    <div class="form-group">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="l_entrevista" value="{{ $data->l_entrevista }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Lugar de la entrevista</span>
        </div>
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="estado" value="{{ $data->estado }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Estado</span>
                </div>
            </div>
            <div class="col border-left">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="municipio" value="{{ $data->municipio }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Municipio</span>
                </div>
            </div>
        </div>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">3. DATOS DE IDENTIFICACIÓN DEL ESTUDIANTE</h2></div>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="n_a_estudiante" value="{{ $data->n_a_estudiante }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Nombre y Apellido</span>
                </div>
            </div>
            <div class="col border-left">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100 numero" type="text" name="cedula_estudiante" value="{{ $data->cedula_estudiante }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Cédula de Identidad</span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="date" name="f_estudiante" value="{{ $data->f_estudiante }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Fecha de Nacimiento</span>
                </div>
            </div>
            <div class="col border-left">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="l_procedencia" value="{{ $data->l_procedencia }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Lugar de procedencia</span>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="direccion" value="{{ $data->direccion }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Dirección</span>
                </div>
            </div>
            <div class="col border-left">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="ciudad" value="{{ $data->ciudad }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Ciudad</span>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="telefono" value="{{ $data->telefono }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Teléfono</span>
        </div>
    </div>
    <div class="form-group">
        <h5>Además de estudiar, ¿trabaja el estudiante?</h5>
        <h3>{{ $data->trabaja==1?"Sí":"No" }}</h3>
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="ocupacion" value="{{ $data->ocupacion }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Ocupación</span>
                </div>
            </div>
            <div class="col border-left">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="sueldo" value="{{ $data->sueldo }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Sueldo Mensual (Bs.)</span>
                </div>
            </div>
        </div>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">4. ESTADO CIVIL</h2></div>
    <div class="form-group">
        {{ $data->e_civil==1?"Soltero":"" }} 
        {{ $data->e_civil==2?"Casado":"" }} 
        {{ $data->e_civil==3?"Divorciado":"" }} 
        {{ $data->e_civil==4?"Viudo":"" }} 
        {{ $data->e_civil==5?"Separado":"" }} 
        {{ $data->e_civil==6?"Concubino":"" }}
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <h5>¿Tiene hijos?</h5>
                <h3>{{ $data->hijos==1?"Sí":"No" }}</h3>
            </div>
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="number" name="num_h">
                    <span class="focus-input100"></span>
                    <span class="label-input100">¿Cuántos?</span>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <h5>Según su condición de Estado Civil, ¿quién tiene la custodia de los hijos?</h5>
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="hijos_custodia" value="{{ $data->hijos_custodia }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Especifique</span>
        </div>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">5. ÁREA SOCIOECONÓMICA</h2></div>
    <div class="form-group">
        <h5>Indique quién es el responsable económico (persona sobre la que recae el mayor peso de la Manutención)</h5>

        <h3>{{ $data->res_econ==1?"Usted":"" }}</h3>
        <h3>{{ $data->res_econ==2?"Madre":"" }}</h3>
        <h3>{{ $data->res_econ==3?"Padre":"" }}</h3>
        <h3>{{ $data->res_econ==4?"Hermano":"" }}</h3>
        <h3>{{ $data->res_econ==5?"Familiar":"" }}</h3>
        <h3>{{ $data->res_econ==6?"Amigo":"" }}</h3>
    </div>
    <hr>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <h5>¿Disfruta de ayuda económica por parte de alguna institución?</h5>
				<h3>{{ $data->ayuda_otra_inst==1?"Sí":"No" }}</h3>
            </div>
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="text" name="nom_inst" value="{{ $data->nom_inst }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Nombre de la Institución</span>
                </div>
            </div>
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100 numero" type="text" name="monto_inst" value="{{ $data->monto_inst }}">
                    <span class="focus-input100"></span>
                    <span class="label-input100">Monto (Bs.)</span>
                </div>
            </div>
        </div>
    </div>
    <hr>
    <div class="form-group">
        <div class="row">
            <div class="col">
                <h5>¿Contribuye otro miembro de la familia con el ingreso familiar?</h5>
				<h3>{{ $data->contri_otro_fa==1?"Sí":"No" }}</h3>
                
            </div>
            <div class="col">
                <div class="wrap-input100 validate-input" data-validate="">
                    <input class="input100" type="number" name="cuantos_contr">
                    <span class="focus-input100"></span>
                    <span class="label-input100">¿Cuántos?</span>
                </div>
            </div>
        </div>
    </div>
    <h5>¿Cuál es el nivel de instrucción del responsable económico?</h5>
    <div class="form-group">
        <table class="table">
            <tr>
                <th>Estudios de Post-grado</th>
                <td>
                    <h3>{{ $data->res_econ_intru_post==0?"Incompleta":"" }}</h3>
                </td>
                <td>
                    <h3>{{ $data->res_econ_intru_post==1?"Completa":"" }}</h3>
                </td>
            </tr>
            <tr>
                <th>Universitario</th>
                <td>
                    <h3>{{ $data->res_econ_intru_univer==0?"Incompleta":"" }}</h3>
                </td>
                <td>
                    <h3>{{ $data->res_econ_intru_univer==1?"Completa":"" }}</h3>
                </td>
            </tr>
            <tr>
                <th>Técnico Superior</th>
                <td>
                    <h3>{{ $data->res_econ_intru_tsu==0?"Incompleta":"" }}</h3>
                </td>
                <td>
                    <h3>{{ $data->res_econ_intru_tsu==1?"Completa":"" }}</h3>
                </td>
            </tr>
            <tr>
                <th>Secundaria</th>
                <td>
                    <h3>{{ $data->res_econ_intru_secun==0?"Incompleta":"" }}</h3>
                </td>
                <td>
                    <h3>{{ $data->res_econ_intru_secun==1?"Completa":"" }}</h3>
                </td>
            </tr>
            <tr>
                <th>Primaria</th>
                <td>
                    <h3>{{ $data->res_econ_intru_prima==0?"Incompleta":"" }}</h3>
                </td>
                <td>
                    <h3>{{ $data->res_econ_intru_prima==1?"Completa":"" }}</h3>
                </td>
            </tr>

        </table>
    </div>
    <div class="form-group">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="ocup_res_econ" value="{{ $data->ocup_res_econ }}">
            <span class="focus-input100"></span>
            <span class="label-input100">¿Cuál es la ocupación del responsable económico?</span>
        </div>
    </div>
    <div class="form-group">
        <h5>En caso de trabajar, su condición es...</h5>
        
        <h3>{{ $data->trabajar_condi==1?"Fijo":"" }}</h3> 
        <h3>{{ $data->trabajar_condi==2?"Contratado":"" }}</h3> 
        <h3>{{ $data->trabajar_condi==3?"Ocasional":"" }}</h3> 
        <h3>{{ $data->trabajar_condi==4?"Destajo":"" }}</h3>
    </div>

    <div class="form-group">
        <h5>¿Dónde reside el estudiante mientras estudia?</h5>
        <h3>{{ $data->reside_estudiante }}</h3>
        
    </div>
    <div class="form-group">
        <p>
            <span class="h3">(*) Nota:</span> En caso de que el estudiante no viva con los padres, ni depende económicamente de ellos, anote los datos del jefe del núcleo familiar donde vive o de quién depende y agregue las observaciones necesarias al respecto 
        </p>
        <p>
            <h3>{{ $data->obs_reside_estudiante }}</h3>
        </p>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">6. EGRESOS DEL HOGAR (Mensual)</h2></div>

    <table class="table table-borderless">
        <thead>
            <tr>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <th>Monto (Bs.)</th>
            </tr>
        </thead>
        <tbody class="listEgresos">
        	@foreach ($data->egresos_hogar as $e)
        	<tr>
        		
        		<th>{{ $e->nombre }}</th>
                <td>{{ $e->monto }}</td>
        	</tr>
        	@endforeach
        </tbody>
    </table>
    <table class="table">
        <tr>
            <td class="h4">Total:</td>
            <td class="text-right totalEgresos h3"></td>
            <td></td>
        </tr>
    </table>
    <div class="pt-4 pb-4"><h2 class="border-bottom">(*) 7. TIPO DE VIVIENDA</h2></div>
    <div class="form-group">
        <h3>{{ $data->tipo_vivienda }}</h3>
        
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">(*) 8. TENENCIA DE LA VIVIENDA</h2></div>
    <div class="form-group">
        <h3>{{ $data->tenencia_vivienda }}</h3>
        
    </div>
    <div class="form-group">
        <h5>En caso de estar pagando la vivienda  o alquiler, indique el monto mensual</h5>
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100 numero" type="text" name="tenencia_vivienda_monto" value="{{ $data->tenencia_vivienda_monto }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Monto (Bs.)</span>
        </div>
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">(*) 9. DÓNDE SE ENCUENTRA UBICADA LA VIVIENDA</h2></div>
    <div class="form-group">
        <h3>{{ $data->ubicacion_vivienda }}</h3>
        
    </div>
    <div class="pt-4 pb-4"><h2 class="border-bottom">10. DOTACIÓN DE SERVICIOS</h2></div>
    <table class="table table-borderless tableServicios">
    	@foreach ($data->vivienda_servicios as $e)
    		<tr>
    			<td>{{ $e->nombre }}</td>
    			<th>{{ $e->tipo }}</th>
    		</tr>
    	@endforeach
    </table>
    <div class="pt-4 pb-4"><h2 class="border-bottom">11. ESTADO DE SALUD DEL GRUPO FAMILIAR</h2></div>
    <div class="form-group">
        <h5>¿Existe algún enfermo dentro del grupo familiar que requiera atención permanente?</h5>
		<h3>{{ $data->familiar_enfermo==1?"Sí":"No" }}</h3>
        
    </div>
    <div class="form-group">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="text" name="espe_familiar_enfermo" value="{{ $data->espe_familiar_enfermo }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Especifique...</span>
        </div>
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Tipo de Enfermedad</th>
                <th>Gasto Médico</th>
                <th>Nombre de Medicina</th>
                <th>Monto en Bs.</th>
                <th class="text-center">| <button class="btn agregarFamiliarEnfermo"><i class="fa fa-plus"></i></button> |</th>
            </tr>
        </thead>
        <tbody class="TablaFamiliares_enfer">
            @foreach ($data->familiares_enfer as $e)
            <tr>
                <td>{{ $e->tipo }}</td>
				<td>{{ $e->gasto }}</td>
				<td>{{ $e->medicina }}</td>
				<td>{{ $e->monto }}</td>
            </tr>
        	@endforeach
        </tbody>
    </table>
    <div class="pt-4 pb-4"><h2 class="border-bottom">12. DATOS DEL GRUPO FAMILIAR</h2></div>
    <div class="form-group">
        <h3>{{ $data->num_familiares }}</h3>
    </div>
    <p>
        <b>Señale el número de personas que integran el grupo familiar, incluyendo el solicitante. Comience por el jefe de la familia</b>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre y Apellido</th>
                <th>Parentesco</th>
                <th>Edad</th>
                <th>Estado Civil</th>
                <th>Ocupación</th>
                <th>Sueldo (Bs.)</th>
                <th>Nivel educativo</th>
            </tr>
        </thead>
        <tbody class="TablaGrupoFamiliar">
            @foreach ($data->familiares as $e)
            <tr>

				<td>{{ $data->nombres_apellidos }}</td>
				<td>{{ $data->parentesco }}</td>
				<td>{{ $data->nacimiento }}</td>
				<td>{{ $data->estado_civil }}</td>
				<td>{{ $data->ocupacion }}</td>
				<td>{{ $data->sueldo }}</td>
				<td>{{ $data->nivel_educativo }}</td>
            </tr>
        	@endforeach
        </tbody>
    </table>
    <h3>Señale el número total de estudiantes dentro del grupo familiar (incluyendo el solicitante)</h3>
    <table class="table">
        <tr>
            <th>Primaria</th>
            <td>{{ $data->num_primaria }}</td>
        </tr>
        <tr>
            <th>Secundaria</th>
            <td>{{ $data->num_secundaria }}</td>
        </tr>
        <tr>
            <th>Superior</th>
            <td>{{ $data->num_superior }}</td>
        </tr>
    </table>
    <h3>¿PRESENTA USTED ALGUN TIPO DE DISCAPACIDAD?</h3>
    <table class="table table-borderless tableDiscapacidad">
    	@foreach ($data->discapacidad_estudiante as $e)
    		<tr>
    			<td>{{ $e->nombre }}</td>
    			<th>{{ $e->tipo }}</th>
    		</tr>
    	@endforeach
    </table>
    <h3>(*) RESUMEN DEL CASO</h3>
    <div class="form-group">
        <h3>{{ $data->resumen_caso }}</h3>
    </div>
    <hr>
    <h3>(*) OBSERVACIONES GENERALES</h3>
    <div class="form-group">
        <h3>{{ $data->obs_generales }}</h3>
    </div>
    <div class="form-group">
        <div class="wrap-input100 validate-input" data-validate="">
            <input class="input100" type="date" name="fecha" value="{{ $data->fecha }}">
            <span class="focus-input100"></span>
            <span class="label-input100">Fecha</span>
        </div>
    </div>
    <script type="text/javascript">
    	$(function(){
    		$("input")
    		.blur()
    		.attr("disabled",true)

    	})
    </script>
</div>