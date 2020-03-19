<table class="table align-middle">
	<thead>
		<tr>
			<th>ID</th>
			<th>Nombre</th>
			<th>Disponible</th>
			<td></td>
		</tr>
	</thead>
	<tbody>
		@foreach ($data as $e)
			@if ($e->nombre!="ninguna")
				<tr>
					<td>{{ $e->id }}</td>
					<td>{{ $e->nombre }}</td>
					<td>
						<div class="switch colored">
						  	<input type="checkbox" 
						  	id="colored" 
						  	disabled="" 
							@if ($e->disponible==1) checked @endif
						  	name="disponible">
						 	<label for="colored"></label>
						</div>
					</td>
					<td>
						<div class="btn-group">
							<button data-id="{{ $e->id }}" class="btn btn-outline-primary editar" data-target=".modalTarget" data-toggle="modal"><i class="fa fa-pencil"></i></button>
							<button data-id="{{ $e->id }}" class="btn btn-outline-danger eliminar"><i class="fa fa-trash"></i></button>
						</div>
					</td>
				</tr>
			@endif
		@endforeach
		@if (!count($data))
			<tr>
				<td colspan="4">
					
					<p class="text-center text-muted m-2">
						<i class="fa fa-search fa-2x"></i><br>
						Nada para mostrar.
					</p>
				</td>
			</tr>
		@endif
	</tbody>
</table>