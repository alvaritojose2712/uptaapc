@extends('app.schema')
@section('tittle',"Ver detalles")
@section('contenido')
<div class="p-4 text-right">
    <a class="btn btn-danger" href="/estudiante/pdf/{{ $data->id }}"><i class="fa fa-file-pdf-o fa-2x"></i></a>

</div>
@include("estudiante.showCrudo", ['data' => $data]) 
@endsection 