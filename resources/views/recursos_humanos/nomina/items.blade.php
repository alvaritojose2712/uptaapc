<table class="table">
	<thead>
		<tr>
			<th>ID</th>
			<th>Nombre</th>
			<th>Fecha de creación</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
		@foreach ($data as $e)
			<tr>
				<td>{{ $e->id }}</td>
				<td>{{ $e->denominacion }}</td>
				<td>{{ $e->fecha }}</td>
				<td>
					<div class="btn-group">
						<button class="btn btn-primary openModalRunNomina" data-id_nomina="{{ $e->id }}" data-toggle="modal" data-target=".modalTarget"><i class="fa fa-send"></i></button>
						<a class="btn btn-warning" href="{{ route('nominas.configNomina',["id_nomina"=>$e->id]) }}"><i class="fa fa-cog"></i></a>
						<a class="btn btn-danger" href="{{ route('nominas.destroy',["id_nomina"=>$e->id]) }}"><i class="fa fa-trash"></i></a>
					</div>
				</td>
			</tr>
		@endforeach
	</tbody>
</table>