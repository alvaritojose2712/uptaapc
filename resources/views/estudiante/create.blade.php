@php
    use Illuminate\Support\Str;
@endphp
@extends('layouts.app')
@section('tittle',"Seminario")
@section("outside")
        <button class="btn zoom guardar" style="position: fixed;bottom: 0%;right: 0%;z-index: 99999;">
            <img src="{{ asset('image/save2.png') }}" width="120px" class="">
        </button>
@endsection
@section('content')

<form action="/seminario" method="post" onsubmit="return false" id="formulario" enctype="multipart/form-data">
    <div class="card">

        <h2 class="card-header dark-text text-center py-4">
            <strong>Inscripción - Seminario</strong>
        </h2>

        <!--Card content-->
        <div class="card-body px-lg-5 shadow">
            <div class="container">
                <div class="row">
                    <div class="col-md-6">
                        <div class="md-form"> 
                            <input type="text" id="nombres" name="nombres" class="form-control" value="{{ isset($data)?$data->nombres:null }}">
                            <label for="nombres">Nombres</label>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="md-form">
                            <input type="text" id="apellidos" name="apellidos" class="form-control" value="{{ isset($data)?$data->apellidos:null }}">
                            <label for="apellidos">Apellidos</label>
                        </div>
                    </div>
                </div>
               <div class="row">
                   <div class="col-md-6">
                        <div class="md-form"> <i class="fa fa-id-card prefix"></i>
                            <input type="text" id="cedula" name="cedula" maxlength="9" class="numero form-control" value="{{ isset($data)?$data->cedula:null }}">
                            <label for="cedula">Cédula de identidad</label>
                        </div>
                   </div>
                   <div class="col-md-6">
                        <div class="md-form"> <i class="fa fa-calendar prefix"></i>
                            <input type="date" id="nacimiento" name="nacimiento" class="form-control" value="{{ isset($data)?$data->nacimiento:null }}">
                            <label for="nacimiento">Fecha de nacimiento</label>
                        </div>
                   </div>
               </div>
                <div class="row">
                    <div class="col">
                        <select name="sexo" class="mdb-select md-form colorful-select dropdown-primary">
                          <option value="Masculino" {{ isset($data)?$data->sexo=="Masculino"?"selected":"":null }}>Masculino</option>
                          <option value="Femenino" {{ isset($data)?$data->sexo=="Femenino"?"selected":"":null }}>Femenino</option>
                        </select>
                        <label class="mdb-main-label">Sexo</label>
                    </div>
                    <div class="col">

                          <select name="estado_civil" class="mdb-select md-form colorful-select dropdown-primary">
                            
                            <option value="Soltero/a" {{ isset($data)?$data->estado_civil=="Soltero/a"?"selected":"":null }}>Soltero/a</option>
                            <option value="Comprometido/a" {{ isset($data)?$data->estado_civil=="Comprometido/a"?"selected":"":null }}>Comprometido/a</option>
                            <option value="Casado/a" {{ isset($data)?$data->estado_civil=="Casado/a"?"selected":"":null }}>Casado/a</option>
                            <option value="Separado/a" {{ isset($data)?$data->estado_civil=="Separado/a"?"selected":"":null }}>Separado/a</option>
                            <option value="Divorciado/a" {{ isset($data)?$data->estado_civil=="Divorciado/a"?"selected":"":null }}>Divorciado/a</option>
                            <option value="Viudo/a" {{ isset($data)?$data->estado_civil=="Viudo/a"?"selected":"":null }}>Viudo/a</option>
                            <option value="Complicado" {{ isset($data)?$data->estado_civil=="Complicado"?"selected":"":null }}>Complicado</option>
                          </select>
                          <label class="mdb-main-label">Estado civil</label>
                    </div>
                </div>
                <div class="row">
                  <div class="col-md-6">
                       <div class="md-form"> <i class="fa fa-envelope prefix"></i>
                            <input type="email" id="email" name="email" class="form-control" value="{{ isset($data)?$data->email:null }}">
                            <label for="email">Correo Electrónico</label>
                        </div>
                   </div>
                   <div class="col-md-6">
                       <div class="md-form"> <i class="fa fa-phone prefix"></i>
                            <input type="text" id="telefono" name="telefono" class="form-control" value="{{ isset($data)?$data->telefono:null }}">
                            <label for="telefono">Teléfono</label>
                        </div>
                   </div>
                </div>
                <div class="row">
                   <div class="col-md-4">
                        <div class="md-form">
                            <input type="text" id="ciudad" name="ciudad" class="form-control" value="{{ isset($data)?$data->ciudad:null }}">
                            <label for="ciudad">Ciudad</label>
                        </div>
                   </div>
                   <div class="col-md-4">
                      <select name="estado" class="mdb-select md-form colorful-select dropdown-primary">
                          <option value="Amazonas" {{ isset($data)?$data->estado=="Amazonas"?"selected":"":null }}>Amazonas</option>
                          <option value="Anzoátegui" {{ isset($data)?$data->estado=="Anzoátegui"?"selected":"":null }}>Anzoátegui</option>
                          <option value="Apure" {{ isset($data)?$data->estado=="Apure"?"selected":"":null }}>Apure</option>
                          <option value="Aragua" {{ isset($data)?$data->estado=="Aragua"?"selected":"":null }}>Aragua</option>
                          <option value="Barinas" {{ isset($data)?$data->estado=="Barinas"?"selected":"":null }}>Barinas</option>
                          <option value="Bolívar" {{ isset($data)?$data->estado=="Bolívar"?"selected":"":null }}>Bolívar</option>
                          <option value="Carabobo" {{ isset($data)?$data->estado=="Carabobo"?"selected":"":null }}>Carabobo</option>
                          <option value="Cojedes" {{ isset($data)?$data->estado=="Cojedes"?"selected":"":null }}>Cojedes</option>
                          <option value="Delta Amacuro" {{ isset($data)?$data->estado=="Delta Amacuro"?"selected":"":null }}>Delta Amacuro</option>
                          <option value="Distrito Capital" {{ isset($data)?$data->estado=="Distrito Capital"?"selected":"":null }}>Distrito Capital</option>
                          <option value="Falcón" {{ isset($data)?$data->estado=="Falcón"?"selected":"":null }}>Falcón</option>
                          <option value="Guárico" {{ isset($data)?$data->estado=="Guárico"?"selected":"":null }}>Guárico</option>
                          <option value="Lara" {{ isset($data)?$data->estado=="Lara"?"selected":"":null }}>Lara</option>
                          <option value="Mérida" {{ isset($data)?$data->estado=="Mérida"?"selected":"":null }}>Mérida</option>
                          <option value="Miranda" {{ isset($data)?$data->estado=="Miranda"?"selected":"":null }}>Miranda</option>
                          <option value="Monagas" {{ isset($data)?$data->estado=="Monagas"?"selected":"":null }}>Monagas</option>
                          <option value="Nueva Esparta" {{ isset($data)?$data->estado=="Nueva Esparta"?"selected":"":null }}>Nueva Esparta</option>
                          <option value="Portuguesa" {{ isset($data)?$data->estado=="Portuguesa"?"selected":"":null }}>Portuguesa</option>
                          <option value="Sucre" {{ isset($data)?$data->estado=="Sucre"?"selected":"":null }}>Sucre</option>
                          <option value="Táchira" {{ isset($data)?$data->estado=="Táchira"?"selected":"":null }}>Táchira</option>
                          <option value="Trujillo" {{ isset($data)?$data->estado=="Trujillo"?"selected":"":null }}>Trujillo</option>
                          <option value="Vargas" {{ isset($data)?$data->estado=="Vargas"?"selected":"":null }}>Vargas</option>
                          <option value="Yaracuy" {{ isset($data)?$data->estado=="Yaracuy"?"selected":"":null }}>Yaracuy</option>
                          <option value="Zulia" {{ isset($data)?$data->estado=="Zulia"?"selected":"":null }}>Zulia</option>

                      </select>
                      <label class="mdb-main-label">Estado</label>
                   </div>
                   <div class="col-md-4">
                       <div class="md-form"> <i class="fa fa-address-book prefix"></i>
                          <textarea type="text" id="direccion" name="direccion" class="md-textarea form-control" rows="1">{{ isset($data)?$data->direccion:null }}</textarea>
                          <label for="direccion">Dirección</label>
                        </div>
                   </div>
               </div>
               <div class="row">
               </div>
                <h4>¿Trabaja?</h4>
               <div class="row">
                   <div class="col-md-3">
                        <div class="md-form">
                           <div class="form-check form-check-inline">
                              <input type="radio" class="form-check-input autoHide" data-handle="trabaja" data-hideval="0" data-class="l_trabajoHide" id="trabajasi" name="trabaja" value="1" checked="">
                              <label class="form-check-label" for="trabajasi">Sí</label>
                            </div>

                            <!-- Material inline 2 -->
                            <div class="form-check form-check-inline">
                              <input type="radio" class="form-check-input autoHide" data-handle="trabaja" data-hideval="0" data-class="l_trabajoHide" id="trabajano" name="trabaja" value="0">
                              <label class="form-check-label" for="trabajano">No</label>
                            </div>
                        </div>
                   </div>
                   <div class="col-md-9">
                       <div class="md-form l_trabajoHide">
                            <input type="text" id="l_trabajo" name="l_trabajo" class="form-control" value="{{ isset($data)?$data->l_trabajo:null }}">
                            <label for="l_trabajo">Lugar de trabajo</label>
                        </div>
                   </div>
               </div>
               <div class="row">
                   <div class="col-md-4">
                        <div class="md-form"> <i class="fa fa-child prefix"></i>
                            <input type="number" id="hijos" name="hijos" class="form-control" value="{{ isset($data)?$data->hijos:null }}" min="0">
                            <label for="hijos">N° Hijos</label>
                        </div>
                       
                   </div>
               </div>
               <div class="row">
                   <div class="col">
                       
                        <div class="md-form"> <i class="fa fa-pencil-alt prefix"></i>
                          <textarea type="text" id="observacion" name="observacion" class="md-textarea form-control" rows="2">{{ isset($data)?$data->observacion:null }}</textarea>
                          <label for="observacion">Observación</label>
                        </div>
                   </div>
               </div>
               <p class="text-muted">
                 Solo se admiten documentos con formatos: .jpg .png .pdf
               </p>
               <div class="row">
                   <div class="col">
                   
                      {{-- <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-paperclip" aria-hidden="true"></i>
                            <input type="file" name="file_pago">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Comprobante de pago">
                          </div>
                        </div>
                      </div>
                      <hr> --}}
                      <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-id-card" aria-hidden="true"></i>
                            <input type="file" name="file_cedula">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Cédula escaneada">
                          </div>
                        </div>
                      </div>

                      <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-file-image-o" aria-hidden="true"></i>
                            <input type="file" name="file_foto">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Foto tipo carnet">
                          </div>
                        </div>
                      </div>

                      <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-newspaper-o" aria-hidden="true"></i>
                            <input type="file" name="file_fondo_negro">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Fondo negro del título">
                          </div>
                        </div>
                      </div>

                      <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-paperclip" aria-hidden="true"></i>
                            <input type="file" name="file_notas">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Notas certificadas">
                          </div>
                        </div>
                      </div>

                      <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            <input type="file" name="file_const_traba">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Constancia de trabajo">
                          </div>
                        </div>
                      </div>

                      <div class="md-form" class="mb-3">
                        <div class="file-field">
                          <a class="btn-floating peach-gradient mt-0 float-left">
                            <i class="fa fa-book" aria-hidden="true"></i>
                            <input type="file" name="file_sintesis">
                          </a>
                          <div class="file-path-wrapper">
                            <input class="file-path validate" type="text" placeholder="Síntesis curricular">
                          </div>
                        </div>
                      </div>
                   </div>
               </div>

                    
                <div class="text-center mt-4">
                  <button class="btn btn-primary guardar">Enviar <i class="far fa-paper-planeml-1"></i></button>
                </div>
            </div>
        </div>
    </div>
</form>

<!--===============================================================================================-->
<script type="text/javascript">
    $(function(){

        var now = new Date();
        var month = (now.getMonth() + 1);               
        var day = now.getDate();
        if (month < 10) 
            month = "0" + month;
        if (day < 10) 
            day = "0" + day;
        var today = now.getFullYear() + '-' + month + '-' + day;

        @if(Str::contains(url()->current(), ['/seminario/create']))
            $("[type=date").val(today);
        @endif
        $("input").blur();
    })
    $(document).on("keyup",'.numero',function (){
        this.value = (this.value + '').replace(/[^0-9]/g, '');
    });
    
    $(document).on("click",".guardar",function() {
        


        try{
            if($("[name=cedula]").val()==""){
                $("[name=cedula]").focus()
                throw "¡Campo cédula no puede estar en blanco!"
            }

            let inputFiles = ["file_cedula"]
            const extensiones_permitidas = new Array(".png", ".jpg", ".pdf");
            inputFiles.map(e=>{
              let file = $("[name="+e+"]").val()
              let ext = (file.substring(file.lastIndexOf("."))).toLowerCase()
              permitida = false;
              for (var i = 0; i < extensiones_permitidas.length; i++) {
                 if (extensiones_permitidas[i] == ext) {
                 permitida = true;
                 break;
                 }
              }
              if (!permitida) {
                throw "Comprueba la extensión de los archivos a subir. \nSólo se pueden subir archivos con extensiones: " + extensiones_permitidas.join();
              }
            })
          
            var formData = new FormData(document.getElementById("formulario"));
            
            req(formData,"/seminario",".text-noti","POST",null,()=>toggleNoti())
            
        }catch(err){
            alert(err)
        }


    })
</script>


   

@endsection
