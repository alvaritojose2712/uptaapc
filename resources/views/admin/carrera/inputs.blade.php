<div class="form-group">
	<input type="text" class="form-control" placeholder="Nombre de la Carrera" name="nombre" value="{{ isset($data)?$data->nombre:old('nombre') }}">
</div>
<div class="form-group">
	<div class="switch colored">
	 	<input type="hidden" name="disponible" value="0">
	  	<input type="checkbox" 
	  	id="colored" 
	  	@if (isset($data))
			@if ($data->disponible==1) checked @endif
		@else
			@if (old("disponible")==1) checked @endif
		@endif
		value="1" 
	  	name="disponible">
	 	<label for="colored"></label>
	</div>
</div>


