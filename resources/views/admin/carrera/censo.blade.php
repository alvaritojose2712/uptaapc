<link href="{{ asset('css/app.css') }}" rel="stylesheet">

<style type="text/css">
	body{
		background-color: none;
	}
</style>
<div class="container mt-3 mb-3">
	<div class="row">
		<div class="col text-center">
			<span class="h1">Censo de <strong>Pre-inscripciones</strong></span>
			<hr>
		</div>
	</div>
	<div class="row">
		<div class="col text-center">
			<h2 class="text-center font-weight-bold mb-4">PNF's Regulares</h2>
			@foreach ($regulares as $i => $e)
				<button type="button" class="btn btn-primary mb-2">
				  <h2>{{ $i }} <span class="badge badge-light">{{ count($e) }}</span></h2>
				</button>
				<br>
				
			@endforeach
		</div>
		<div class="col text-center">
			<h2 class="text-center font-weight-bold mb-4">Próximamente</h2>
			@foreach ($proxi as $i => $e)
				<button type="button" class="btn btn-warning mb-2">
				  <h2>{{ $i }} <span class="badge badge-light">{{ count($e) }}</span></h2>
				</button>
				<br>
			@endforeach
		</div>
	</div>
</div>