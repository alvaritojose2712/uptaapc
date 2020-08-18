@extends('layouts.app')

@section('content')
	@if (!session("inscrito")&&session("role")==3)
	<div class="h-100 	w-100 d-flex justify-content-center align-items-center">
		<article class="card">
			<div class="card-header">
				<h3 class="text-center">Bienvenido</h3>
			</div>
			<div class="card-body">
				<p class="text-center p-2">
					<span class="text-muted">Para empezar, formaliza tu inscripción completando tus datos.</span>
					<br>
					<a class="btn-lg btn btn-primary mt-2" href="{{ route("primerainscripcion") }}">¡Vamos!</a>
				</p>
			</div>
		</article>
	</div>
	@else
		@include("estudiante.nav")
	@endif

@endsection
