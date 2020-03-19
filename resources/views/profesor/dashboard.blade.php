@extends('layouts.app')

@section('content')
@if (!Auth::user()->inscrito&&Auth::user()->carrera!=1&&Auth::user()->role==2)
	<p class="text-center p-4">
		<span class="text-muted">Cargar mis datos.</span>
		<br>
		<a class="btn-lg btn btn-primary mt-2" href="{{ route("cargarprofesor") }}">¡Vamos!</a>
	</p>
@endif
@endsection

