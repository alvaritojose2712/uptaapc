@extends('layouts.app')
@section('content')
@include("layouts.modal")
@include("recursos_humanos.nav")
<h2 class="text-primary mt-2 mb-4"><i class="fa fa-list-alt"></i> Nóminas</h2>
@include("layouts.search")
<p>
	<a class="btn btn-outline-success" href="{{ route('nominas.crear') }}">Crear <i class="fa fa-plus"></i></a>
</p>
<main id="data">
	
</main>
@endsection
@section("scripts")
<script type="text/javascript">
	
	function query() {
		req({
			q:$("[name=q]").val(),
			n:$("[name=numresultados]").val()
		},'{{ route('nominas.items') }}',"#data")
	}
	$(query)
	$(document).on("click","#q_button", query)

	// $(document).on("click",".eliminar",function() {
	// 	if (confirm("¿Realmente quiere eliminar?")) {
	// 		req({
	// 			id: $(this).data("id"),
	// 		},'ruta',"#errSection","POST",query)
	// 	}
	// })
	$(document).on("click",".openModalRunNomina",function () {
		req({
			id_nomina:$(this).data("id_nomina"),
		},'{{ route('nominas.prerunnomina') }}',"#contenidomodal")
	})
	$(document).on("click",".botonProcesarNomina",function () {
		let inicio = $("[name=nominaInicio]").val()
		let cierre = $("[name=nominaCierre]").val()
		let id_nomina = $(this).data("id_nomina")

		window.open("/rrhh/nomina/"+id_nomina+"/"+inicio+"/"+cierre+"?modo=general", '_blank');

	})
	
	
</script>
@endsection