@include("layouts.error")
<form action="" id="formEdit" data-id="{{ $data->id }}">
	<div class="panel">
		<div class="panel-heading">
			<h2>Editar Carrera</h2>
		</div>
		<div class="panel-body">
			@include("admin.carrera.inputs")
		</div>
		<div class="panel-footer">
			<button class="btn btn-outline-primary">Editar <i class="fa fa-pencil"></i></button>
		</div>
	</div>
</form>
