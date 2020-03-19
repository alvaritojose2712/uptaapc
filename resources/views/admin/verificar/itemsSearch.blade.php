@foreach ($data as $e)
	<tr>
		<td>{{ $e->id }}</td>
		<td>{{ $e->nombres }} {{ $e->apellidos }}</td>
		<td>{{ $e->cedula }}</td>
		<td>
              {{-- <input type="checkbox" class="form-check-input "  id="customSwitches"> --}}
	        <div class="switch colored">
			  	<input type="checkbox" id="colored{{ $e->user->id }}" data-user-id="{{ $e->user->id }}" class="verificarCuentaCheck" @if ($e->user->verificado) {{ "checked" }} @endif>
			 	<label for="colored{{ $e->user->id }}"></label>
			</div>
		</td>
		<td>
			<button class="btn btn-primary btn-sm reqShowData" data-toggle="modal" data-target=".modalTarget" data-id="{{ $e->id }}"><i class="fa fa-eye"></i></button>
			<button class="btn btn-danger btn-sm reqDeleteData" data-user-id="{{ $e->user->id }}"><i class="fa fa-trash"></i></button>
		</td>
	</tr>
@endforeach