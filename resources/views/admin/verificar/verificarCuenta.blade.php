@extends('layouts.app')
@section('content')
@include("layouts.modal")
@include("admin.nav")
<h2 class="text-primary mt-2 mb-4"><i class="fa fa-list-alt"></i> {{ ucfirst($t) }}</h2>
@include("layouts.search")
<table class="table table-hover align-middle">
	<thead>
		<tr>
			<th>ID</th>
			<th>Nombres y Apellidos</th>
			<th>Cédula</th>
			<th>Verificado</th>
			<td></td>
		</tr>
	</thead>
	<tbody id="data"></tbody>
</table>
@endsection
@section("scripts")
<script type="text/javascript">
	function query() {
		req({
			q:$("[name=q]").val(),
			numresultados:$("[name=numresultados]").val()
		},'{{ route('verificarCuenta.items',["t"=>$t]) }}',"#data")
	}
	$(query)
	$(document).on( "click","#q_button", query)
	$(document).on("click",".verificarCuentaCheck",function() {
		req({
			id:$(this).data("user-id"),
			val: $(this).attr('checked'),
		},'{{ route('verificarCuenta.procesar') }}',"","GET",()=>{
			$("[data-user-id="+$(this).data("user-id")+"]").attr("checked",!($(this).attr("checked")))
		})
	})
	$(document).on("click",".reqShowData",function() {
		req({
			id:$(this).data("id"),
		},'{{ route('verificarCuenta.show',["t"=>$t]) }}',"#contenidomodal","GET")
	})
	$(document).on("click",".reqDeleteData",function() {
		if (confirm("¿Realmente quiere eliminar?")) {
			req({
				id:$(this).data("user-id"),
			},'{{ route('verificarCuenta.delete') }}',"","POST",query)
			
		}
	})
</script>
@endsection