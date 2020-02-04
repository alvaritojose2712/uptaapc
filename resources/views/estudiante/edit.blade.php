@extends('app.schema')
@section('tittle',"Editar usuarios")
@section('contenido')
<div class="container-fluid mt-3 mb-3">
    <div class="row">
        <div class="col">
            <form action="/usuarios/config/{{$data->id}}" method="post">
                    @csrf
                    @method("PUT")
                    <div class="headerForm">
                    Editar usuarios <strong>{{$data->n_documento}}</strong>
                    </div>
                    <div>
                        <div class="row">
                            <div class="col border-right">
                                <div class="form-group">
                                    <label class="inp">
                                        <input required type="text" name="usuario" value="{{$data->usuario}}" placeholder="&nbsp;">
                                        <span class="label">Usuario</span>
                                        <span class="border"></span>
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label class="inp">
                                        <input required type="password" name="clave" value="{{$data->clave}}" placeholder="&nbsp;">
                                        <span class="label">Clave</span>
                                        <span class="border"></span>
                                    </label>
                                </div>
                            </div>
                            <div class="col">
                                <fieldset>
                                    <legend>Tipo de permiso</legend>
                                    <div class="toggle">
                                        <select name="role" id="" class="form-control">
                                            <option value="1" {{$data->role=="1"?"selected":""}}>Administrador</option>
                                            <option value="2" {{$data->role=="2"?"selected":""}}>Lectura</option>
                                        </select>
                                        
                                    </div>
                                </fieldset>
                            </div>
                        </div>
                        <hr>
                        <div class="row">
                            <div class="col"><button type="submit" class="btn btn-success btn-block">Editar registro <i class="fa fa-pencil"></i></button></div>
                        </div>
                    </div>
                </form>
        </div>
        <div class="col-md-auto">
            @include('app.nav')
        </div>
    </div>
</div>
@endsection