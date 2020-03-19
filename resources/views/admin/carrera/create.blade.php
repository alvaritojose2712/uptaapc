@include("layouts.error")
<form action="" id="formCreate">
	<div class="panel">
		<div class="panel-heading">
			<h2>Crear Carrera</h2>
		</div>
		<div class="panel-body">
			@include("admin.carrera.inputs")
		</div>
		<div class="panel-footer">
			<button class="btn btn-outline-success">Crear <i class="fa fa-send"></i></button>
		</div>
	</div>
</form>
