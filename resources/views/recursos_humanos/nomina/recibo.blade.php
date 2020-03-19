{{ $id_division }}
<p class="text-center">
	Desde <b>{{ $inicio }}</b> Hasta <b>{{ $cierre }}</b>
</p>
		
<hr>

<h4>{{ $data[0]->estado }}</h4>
</div>
<table class="table table-bordered">
	<thead>
		<tr>
			<th>Nombre y Apellido</th>
			<th>Cédula</th>
			<th>Cuenta bancaria</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{{ $data[0]->nombre }} {{ $data[0]->apellido }}</td>
			<td>{{ $data[0]->cedula }}</td>
			<td>{{ $data[0]->cuenta_bancaria }}</td>
		</tr>
	</tbody>
</table>
<hr>
<table class="table table-bordered">
	<thead>
		<tr>
			<th>Sueldo básico Bs.</th>
			<th>Sueldo normal Bs.</th>
			<th>Sueldo integral Bs.</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>:sueldo:</td>
			<td>:sueldo_normal:</td>
			<td>:sueldo_integral:</td>
		</tr>
	</tbody>
</table>
<hr>
<table class="table table-bordered">
	<thead>
		<tr>
			<th>Estatus</th>
			<th>Categoría</th>
			<th>Cargo</th>
			<th>Dedicación</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>{{ $data[0]->estatus }}</td>
			<td>{{ $data[0]->categoria }}</td>
			<td>{{ $data[0]->cargo }}</td>
			<td>{{ $data[0]->dedicacion }}</td>
		</tr>
	</tbody>
</table>
<br>
<table class="table table-responsive">
	<thead>
		<tr>
			<th width="10%">#</th>
			<th width="30%">Denominación</th>
			<th width="30%">Asignaciones</th>
			<th width="30%">Deducciones</th>
		</tr>
	</thead>
	<tbody>
		@foreach ($data[0]->recibo as $index => $e)
			<tr>
				<td>{{ $index+1 }}</td>
				<td>{{ $e['descripcion'] }}</td>
				@if ($e["movimiento"]==="deduccion")
					<td></td>
				@endif
				<td>
					<table class="table table-borderless table-sm">
						<thead>
							{{-- <tr>
								<th>Monto Bs.</th>	
								<th>Fecha</th>
								<th>Formula</th> 
								<th>Sueldo</th> 
								<th>Utributaria</th> 
								<th>Lunes</th> 
								<th>Nhijos</th> 
								<th>Sueldonormal</th> 
								<th>Sueldointegral</th> 
								<th>Antiguedad</th> 
							</tr> --}}
						</thead>
						<tbody>
							@foreach ($e["versiones"] as $version)
								<tr>
			                    	<td>
										{{ 
											Arr::first($version["monto"], function ($val) use ($id_division) {
						                        return $val["id"]==$id_division;
						                    })["monto"]
									
				                    	}}
			                    	</td>
									{{-- <td>{{ $version["formula_fecha"] }}</td>
			                    	<td>{{$version["formula"]}}</td>
									<td>{{$version["SUELDO"]}}</td>
									<td>{{$version["UTRIBUTARIA"]}}</td>
									<td>{{$version["LUNES"]}}</td>
									<td>{{$version["NHIJOS"]}}</td>
									<td>{{$version["SUELDONORMAL"]}}</td>
									<td>{{$version["SUELDOINTEGRAL"]}}</td>
									<td>{{$version["ANTIGUEDAD"]}}</td> --}}
								</tr>
							@endforeach
						</tbody>
					</table>
				</td>
			</tr>
		@endforeach
	</tbody>
</table>
<div>
	<i>
		<small>
			Fecha de Emisión: {{ date("Y-m-d") }}<br>Hora: {{ date("h:i:s A") }}
		</small>
	</i>
</div>
