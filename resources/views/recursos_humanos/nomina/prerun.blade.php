<style>
	th{
		text-align: right;
	}
	td{
		text-align: left;
	}
</style>
<h3 class="text-center">
	Parámetros de cálculo <a class="btn" href="{{ route('nominas.configNomina',["id_nomina"=>$id_nomina]) }}"><i class="fa fa-cogs"></i></a>
</h3>
<button class="btn btn-lg btn-block btn-primary botonProcesarNomina" data-id_nomina="{{ $id_nomina }}">Procesar <i class="fa fa-cogs"></i></button>
<hr>
<table class="table table-bordered">
	<tr>
		<th>
			<label class="h4" for="inicio">Inicio</label>
		</th>
		<td>
			<input type="date" id="inicio"  class="form-control" name="nominaInicio" value="2019-01-01">
		</td>
	</tr>
	<tr>
		<th>
			<label class="h4" for="cierre">Cierre</label>
		</th>
		<td>
			<input type="date" id="cierre"  class="form-control" name="nominaCierre" value="2019-01-31">
		</td>
	</tr>
	<tr>
		<th>Personal por condición ({{ count($PersonalCondiciones) }})</th>
		<td>
			{{-- <ul class="list-group list-group-flush">
				@foreach ($PersonalCondiciones as $e)
					<li class="list-group-item">{{ $e->cedula }} | {{ $e->nombre }} {{ $e->apellido }}</li>
				@endforeach
			</ul> --}}
		</td>
	<tr>
		<th>
			Personal adicional ({{ count($PersonalAdicional) }}) 
		</th>
		<td>
			{{-- <ul class="list-group list-group-flush">
				@foreach ($PersonalAdicional as $e)
					<li class="list-group-item">{{ $e->cedula }} | {{ $e->nombre }} {{ $e->apellido }}</li>
				@endforeach
			</ul> --}}
		</td>
	</tr>
	<tr>
		<th>Fórmulas</th>
		<td>
			<ul>
				@foreach ($formulas as $e)
					<li>
						@if ($e->movimiento=="asignacion") <i class="fa fa-arrow-up text-success"></i> @endif
						@if ($e->movimiento=="deduccion") <i class="fa fa-arrow-down text-danger"></i>  @endif
						@if ($e->movimiento!="deduccion"&&$e->movimiento!="asignacion") {{ $e->movimiento }}  @endif
						{{ $e->descripcion }}
					</li>
				@endforeach
				
			</ul>
		</td>
		<td>
			<ul>
				<li><h4>Divisiones</h4></li>

				@foreach ($divisionesFormulas as $e)
					<li>
						{{ $e->division->denominacion }} || {{ $e->formula->denominacion->descripcion }} -> {{ $e->formula->fecha }}
					</li>
				@endforeach
				
			</ul>
		</td>
	</tr>
	<tr>
		<th>Fórmulas adicionales</th>
		<td>
			<ul>
				@foreach ($adic_formula as $e)
					<li>
						{{ $e->cedula }} || {{ $e->formula->denominacion->descripcion }}
					</li>
				@endforeach
				
			</ul>
		
		</td>
	</tr>
	<tr>
		<th>Tablas de sueldo</th>
		<td>
			<ul>
				@foreach ($TablaSueldo as $e)
					<li>
						{{ $e->tabla->descripcion }}
					</li>
				@endforeach
				
			</ul>
		
		</td>
	</tr>
	<tr>
		<th>Unidad Tributaria</th>
		<td>
			<ul>
				@foreach ($returnUt as $e)
					<li>
						{{ $e->tabla->fecha }} || {{ $e->tabla->valor }}
					</li>
				@endforeach
				
			</ul>
		
		</td>
	</tr>
	
</table>

