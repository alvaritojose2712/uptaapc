{{-- <div class="" style="height: 100px"></div> --}}
<div>
	<div class="switch colored pull-right">
	  	<input type="checkbox" id="colored{{ $data->user->id }}" data-user-id="{{ $data->user->id }}" class="verificarCuentaCheck" @if ($data->user->verificado) {{ "checked" }} @endif>
	 	<label for="colored{{ $data->user->id }}"></label>
	</div>
	
</div>
<div>
	<div class="container-fluid">
		<div class="row mb-2">
			<div class="col-md-auto">
				<div class="mr-1" style="border-radius: 80px;width: 100px;height: 100px;background-size: cover;background-image: url('{{ isset($data->file_foto)?url($data->file_foto):"" }}');"></div>
			</div>
			<div class="col align-items-center d-flex">
				<div class="">
					<span class="">{{ $data->cedula }}</span>
					<h2 class="">
						{{ $data->nombres }} {{ $data->apellidos }}
					</h2>
					<span class="h5">{{ $data->user->nombreCarrera->nombre }}</span>
					
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col">
				<table class="table">
					<tr>
						<th>Sexo</th>
						<th>Fecha de nacimiento</th>
						<th>Estado civil</th>
					</tr>
					<tr>
						<td>{{ $data->sexo }}</td>
						<td>{{ $data->nacimiento }}</td>
						<td>{{ $data->estado_civil }}</td>
					</tr>
					<tr>
						<th>Teléfono</th>
						<th colspan="2">Correo electrónico</th>
					</tr>
					<tr>
						<td>{{ $data->telefono }}</td>
						<td colspan="2">{{ $data->user->email }}</td>
					</tr>
					<tr>
						<th>Ciudad</th>
						<th>Estado</th>
						<th>Dirección</th>
					</tr>
					<tr>
						<td>{{ $data->ciudad }}</td>
						<td>{{ $data->estado }}</td>
						<td>{{ $data->direccion }}</td>
					</tr>
					
					@if ($data->user->role==3)
						<tr>
							<th>¿Trabaja?</th>
							@if ($data->trabaja)
								<th>Lugar de trabajo</th>
							@endif
						</tr>
						<tr>
							<td>{{ $data->trabaja?"Sí":"No" }}</td>
							@if ($data->trabaja)
								<td>{{ $data->l_trabajo }}</td>
							@endif
						</tr>
					@endif
					<tr>
						<th colspan="2">N° de Hijos</th>
						<th colspan="2">Observación</th>
					</tr>
					<tr>
						<td colspan="2">{{ $data->hijos }}</td>
						<td colspan="2">{{ $data->observacion }}</td>
					</tr>
				</table>
				<h2 class="text-center">Documentos</h2>
				<table class="table">
						<tr>
						
							<td>
								<a href="{{ isset($data->file_foto)?url($data->file_foto):"" }}" target="blank">Foto <i class="fa fa-send"></i></a>
							</td>
							<td>
								<a href="{{ isset($data->file_cedula)?url($data->file_cedula):"" }}" target="blank">Cédula escaneada<i class="fa fa-send"></i></a>
							</td>
						@if ($data->user->role==3)

							<td>
								<a href="{{ isset($data->file_fondo_negro)?url($data->file_fondo_negro):"" }}" target="blank">Fondo negro <i class="fa fa-send"></i></a>
							</td>
							<td>
								<a href="{{ isset($data->file_notas)?url($data->file_notas):"" }}" target="blank">Notas <i class="fa fa-send"></i></a>
							</td>
						@endif
						</tr>
				</table>
			</div>
		</div>
	</div>
</div>
