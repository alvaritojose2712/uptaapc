@extends('layouts.app')

@section('content')
@if (!Auth::user()->inscrito&&Auth::user()->carrera!=1&&Auth::user()->role==3)
		<h3 class="text-center">Bienvenido</h3>
	<p class="text-center p-2">
		<span class="text-muted">Para empezar, formaliza la inscripción enviando tus datos.</span>
		<br>
		<a class="btn-lg btn btn-primary mt-2" href="{{ route("primerainscripcion") }}">¡Vamos!</a>
	</p>
@endif

@endsection
