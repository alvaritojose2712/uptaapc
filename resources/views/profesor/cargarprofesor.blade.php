@php
    use Illuminate\Support\Str;
@endphp
@extends('layouts.app')
@section('tittle',"Inscripción")
@section('content')

<form action="{{ route('cargarprofesor.store') }}" method="post" enctype="multipart/form-data">
    @csrf
    <h2 class="card-header dark-text text-center py-4">
        <strong>Cargar datos del profesor</strong>
    </h2>
    <div class="card-body px-lg-5 shadow">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group"> 
                        <label for="nombres">Nombres</label>
                        <input type="text" id="nombres" required name="nombres" placeholder="Por ejemplo, Alvaro Jose" class="form-control" value="{{ isset($data)?$data->nombres:old('nombres') }}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="apellidos">Apellidos</label>
                        <input type="text" id="apellidos" required name="apellidos" placeholder="Por ejemplo, Ospino Peñuela" class="form-control" value="{{ isset($data)?$data->apellidos:old("apellidos") }}">
                    </div>
                </div>
            </div>
           <div class="row">
               <div class="col-md-6">
                    <label class="label">Sexo</label>
                    <select required name="sexo" class="form-control">
                      <option value="Masculino" {{ isset($data)?$data->sexo=="Masculino"?"selected":"":old("sexo")=="Masculino"?"selected":null }}>Masculino</option>
                      <option value="Femenino" {{ isset($data)?$data->sexo=="Femenino"?"selected":"":old("sexo")=="Femenino"?"selected":null }}>Femenino</option>
                    </select>
               </div>
               <div class="col-md-6">
                    <div class="form-group"> <i class="fa fa-calendar prefix"></i>
                        <label for="nacimiento">Fecha de nacimiento</label>
                        <input type="date" id="nacimiento" required name="nacimiento" class="form-control" value="{{ isset($data)?$data->nacimiento:old("nacimiento") }}">
                    </div>
               </div>
           </div>
            <div class="row">
                
                <div class="col">
                    <div class="form-group">
                      
                      <label class="label">Estado civil</label>
                      <select required name="estado_civil" class="form-control">
                        
                        <option value="Soltero/a" {{ isset($data)?$data->estado_civil=="Soltero/a"?"selected":"":old("estado_civil")=="Soltero/a"?"selected":null }}>Soltero/a</option>
                        <option value="Comprometido/a" {{ isset($data)?$data->estado_civil=="Comprometido/a"?"selected":"":old("estado_civil")=="Comprometido/a"?"selected":null }}>Comprometido/a</option>
                        <option value="Casado/a" {{ isset($data)?$data->estado_civil=="Casado/a"?"selected":"":old("estado_civil")=="Casado/a"?"selected":null }}>Casado/a</option>
                        <option value="Separado/a" {{ isset($data)?$data->estado_civil=="Separado/a"?"selected":"":old("estado_civil")=="Separado/a"?"selected":null }}>Separado/a</option>
                        <option value="Divorciado/a" {{ isset($data)?$data->estado_civil=="Divorciado/a"?"selected":"":old("estado_civil")=="Divorciado/a"?"selected":null }}>Divorciado/a</option>
                        <option value="Viudo/a" {{ isset($data)?$data->estado_civil=="Viudo/a"?"selected":"":old("estado_civil")=="Viudo/a"?"selected":null }}>Viudo/a</option>
                        <option value="Complicado" {{ isset($data)?$data->estado_civil=="Complicado"?"selected":"":old("estado_civil")=="Complicado"?"selected":null }}>Complicado</option>
                      </select>
                    </div>
                </div>
            </div>
            <div class="row">
              
               <div class="col-md-6">
                   <div class="form-group"> <i class="fa fa-phone prefix"></i>
                        <label for="telefono">Teléfono</label>
                        <input type="text" id="telefono" maxlength="11" required name="telefono" placeholder="Por ejemplo, 04261234567" class="form-control" value="{{ isset($data)?$data->telefono:old('telefono') }}">
                    </div>
               </div>
            </div>
            <div class="row">
               <div class="col-md-4">
                    <div class="form-group">
                        <label for="ciudad">Ciudad</label>
                        <input type="text" id="ciudad" required name="ciudad" placeholder="Por ejemplo, Mantecal" class="form-control" value="{{ isset($data)?$data->ciudad:old('ciudad') }}">
                    </div>
               </div>
               <div class="col-md-4">
                  <label class="label">Estado</label>
                  <select required name="estado" class="form-control">
                      <option value="Amazonas" {{ isset($data)?$data->estado=="Amazonas"?"selected":"":old("estado")=="Amazonas"?"selected":null }}>Amazonas</option>
                      <option value="Anzoátegui" {{ isset($data)?$data->estado=="Anzoátegui"?"selected":"":old("estado")=="Anzoátegui"?"selected":null }}>Anzoátegui</option>
                      <option value="Apure" {{ isset($data)?$data->estado=="Apure"?"selected":"":old("estado")=="Apure"?"selected":null }}>Apure</option>
                      <option value="Aragua" {{ isset($data)?$data->estado=="Aragua"?"selected":"":old("estado")=="Aragua"?"selected":null }}>Aragua</option>
                      <option value="Barinas" {{ isset($data)?$data->estado=="Barinas"?"selected":"":old("estado")=="Barinas"?"selected":null }}>Barinas</option>
                      <option value="Bolívar" {{ isset($data)?$data->estado=="Bolívar"?"selected":"":old("estado")=="Bolívar"?"selected":null }}>Bolívar</option>
                      <option value="Carabobo" {{ isset($data)?$data->estado=="Carabobo"?"selected":"":old("estado")=="Carabobo"?"selected":null }}>Carabobo</option>
                      <option value="Cojedes" {{ isset($data)?$data->estado=="Cojedes"?"selected":"":old("estado")=="Cojedes"?"selected":null }}>Cojedes</option>
                      <option value="Delta Amacuro" {{ isset($data)?$data->estado=="Delta Amacuro"?"selected":"":old("estado")=="Delta Amacuro"?"selected":null }}>Delta Amacuro</option>
                      <option value="Distrito Capital" {{ isset($data)?$data->estado=="Distrito Capital"?"selected":"":old("estado")=="Distrito Capital"?"selected":null }}>Distrito Capital</option>
                      <option value="Falcón" {{ isset($data)?$data->estado=="Falcón"?"selected":"":old("estado")=="Falcón"?"selected":null }}>Falcón</option>
                      <option value="Guárico" {{ isset($data)?$data->estado=="Guárico"?"selected":"":old("estado")=="Guárico"?"selected":null }}>Guárico</option>
                      <option value="Lara" {{ isset($data)?$data->estado=="Lara"?"selected":"":old("estado")=="Lara"?"selected":null }}>Lara</option>
                      <option value="Mérida" {{ isset($data)?$data->estado=="Mérida"?"selected":"":old("estado")=="Mérida"?"selected":null }}>Mérida</option>
                      <option value="Miranda" {{ isset($data)?$data->estado=="Miranda"?"selected":"":old("estado")=="Miranda"?"selected":null }}>Miranda</option>
                      <option value="Monagas" {{ isset($data)?$data->estado=="Monagas"?"selected":"":old("estado")=="Monagas"?"selected":null }}>Monagas</option>
                      <option value="Nueva Esparta" {{ isset($data)?$data->estado=="Nueva Esparta"?"selected":"":old("estado")=="Nueva Esparta"?"selected":null }}>Nueva Esparta</option>
                      <option value="Portuguesa" {{ isset($data)?$data->estado=="Portuguesa"?"selected":"":old("estado")=="Portuguesa"?"selected":null }}>Portuguesa</option>
                      <option value="Sucre" {{ isset($data)?$data->estado=="Sucre"?"selected":"":old("estado")=="Sucre"?"selected":null }}>Sucre</option>
                      <option value="Táchira" {{ isset($data)?$data->estado=="Táchira"?"selected":"":old("estado")=="Táchira"?"selected":null }}>Táchira</option>
                      <option value="Trujillo" {{ isset($data)?$data->estado=="Trujillo"?"selected":"":old("estado")=="Trujillo"?"selected":null }}>Trujillo</option>
                      <option value="Vargas" {{ isset($data)?$data->estado=="Vargas"?"selected":"":old("estado")=="Vargas"?"selected":null }}>Vargas</option>
                      <option value="Yaracuy" {{ isset($data)?$data->estado=="Yaracuy"?"selected":"":old("estado")=="Yaracuy"?"selected":null }}>Yaracuy</option>
                      <option value="Zulia" {{ isset($data)?$data->estado=="Zulia"?"selected":"":old("estado")=="Zulia"?"selected":null }}>Zulia</option>

                  </select>
               </div>
               <div class="col-md-4">
                   <div class="form-group"> <i class="fa fa-address-book prefix"></i>
                    <label for="direccion">Dirección</label>
                      <textarea type="text" id="direccion" required name="direccion" placeholder="Por ejemplo, Barrio nuevo, Vereda 1, Casa #7" class="form-control" rows="2">{{ isset($data)?$data->direccion:old('direccion') }}</textarea>
                    </div>
               </div>
           </div>
           <div class="row">
               <div class="col-md-4">
                    <div class="form-group"> <i class="fa fa-child prefix"></i>
                        <label for="hijos">N° Hijos</label>
                        <input type="number" id="hijos" required name="hijos" class="form-control" value="{{ isset($data)?$data->hijos:old("hijos",0) }}" min="0">
                    </div>
                   
               </div>
           </div>
           <div class="row">
               <div class="col">
                   
                    <div class="form-group"> <i class="fa fa-pencil-alt prefix"></i>
                      <label for="observacion">Observación</label>
                      <textarea type="text" id="observacion" name="observacion" placeholder="Por ejemplo, Ninguna" class="md-textarea form-control" rows="2">{{ isset($data)?$data->observacion:old('observacion') }}</textarea>
                    </div>
               </div>
           </div>
           <hr>
           <p><h2>Adjunte los requisitos solicitados</h2></p>
           <p class="text-muted">
             Solo se admiten documentos con formatos: .jpg .jpeg .png .pdf
           </p>
           <div class="row">
               <div class="col">
               
                  <h3 class="text-muted">Cédula escaneada</h3>
                  <div class="form-group" class="mb-3">
                      <i class="fa fa-id-card" aria-hidden="true"></i>
                      <input type="file" required name="file_cedula" value="{{ old('file_cedula') }}">
                  </div>
                  <br>
          
               </div>
           </div>

                
            <div class="text-center mt-4">
              <button class="btn btn-primary guardar">Enviar <i class="far fa-paper-planeml-1"></i></button>
            </div>
        </div>
    </div>  
</form>
  

@endsection
