
@extends('layouts.app')
@section('content')
@include("recursos_humanos.nav")
@include("layouts.modal")

	<h5 class="text-center"><code>{{ $inicio }}</code> - <code>{{ $cierre }}</code></h5>
	<h1 class="text-center">{{ $nomina->denominacion }} </h1>
	<h4 class="text-center"><b>Asignados</b> {{ count($data) }}</h4>
	<nav>
	  <div class="nav nav-tabs" id="nav-tab" role="tablist">
	    @foreach ($divisiones as $index => $divi)
	    	<a class="nav-item nav-link {{ $index==0?"active":"" }}" id="nav-{{ $index }}-tab" data-toggle="tab" href="#nav-{{ $index }}" role="tab" aria-controls="nav-{{ $index }}" aria-selected="true">{{ $divi["denominacion"] }}</a>
	    @endforeach
	  </div>
	</nav>

	<div class="tab-content" id="nav-tabContent">
	  @foreach ($divisiones as $index => $divi)
	  	<div class="tab-pane fade {{ $index==0?"show active":"" }}" id="nav-{{ $index }}" role="tabpanel" aria-labelledby="nav-{{ $index }}-tab">
			<h1>{{ $divi["id"] }}</h1>
				<table class="table">
				<thead>
					<tr>
						<th>ID</th>
						<th>Nombre</th>
						<th>Apellido</th>
						<th>Cédula</th>
						<th>Monto Bs.</th>
					</tr>
				</thead>
				<tbody>
					@foreach ($data as $e)
						<tr>
							<td>{{ $e->id }}</td>
							<td>{{ $e->nombre }}</td>
							<td>{{ $e->apellido }}</td>
							<td>{{ $e->cedula }}</td>
							<td><a href="#" data-idpersona="{{ $e->id }}" data-toggle="modal" data-division="{{ $divi['id'] }}" data-target=".modalTarget" class="showRecibo"><i class="fa fa-send"></i></a></td>
						</tr>
					@endforeach
				</tbody>
			</table>
	  	</div>
	  @endforeach
	</div>
		


	
@endsection
@section("scripts")
	<script type="text/javascript">
		$(document).on("click",".showRecibo", function() {
			req({
				id_division:$(this).data("division"),
				modo: "recibo",
			},'/rrhh/nomina/{{ $nomina->id }}/{{ $inicio }}/{{ $cierre }}/'+$(this).data("idpersona"),"#contenidomodal")
		})
		
	
	</script>
@endsection
