@extends('layouts.app')
@section('content')
@include("layouts.modal")
@include("admin.nav")
<h2 class="text-primary mt-2 mb-4"><i class="fa fa-list-alt"></i> Administrar carrera</h2>
@include("layouts.search")
<p>
	<button class="btn btn-outline-success crear" data-target=".modalTarget" data-toggle="modal">Crear <i class="fa fa-plus"></i></button>
</p>
<main id="data">
	
</main>
@endsection
@section("scripts")
<script type="text/javascript">
	function getForm(_this) {
		let data = {}
		$(_this).serializeArray().map(e=>{ data[e.name] = e.value })
		return data
	}
	function query() {
		req({
			q:$("[name=q]").val(),
			n:$("[name=numresultados]").val()
		},'{{ route('carrera.items') }}',"#data")
	}
	$(query)
	$(document).on("click","#q_button", query)
	$(document).on("click",".crear",function() {
		req({},'{{ route('carrera.create') }}',"#contenidomodal")
	})
	$(document).on("submit","#formCreate",function(e) {
		e.preventDefault()
		req(getForm(this),'{{ route('carrera.store') }}',"#contenidomodal","POST",query)
	})

	$(document).on("click",".editar", function(){ req({
			id: $(this).data("id"),
		},'{{ route('carrera.edit') }}',"#contenidomodal") } )
	$(document).on("submit","#formEdit",function(e) {
		e.preventDefault()
		req({
			id: $(this).data("id"),
			data:getForm(this)
		},'{{ route('carrera.update') }}',"#contenidomodal","POST",query)
	})

	$(document).on("click",".eliminar",function() {
		if (confirm("¿Realmente quiere eliminar?")) {
			req({
				id: $(this).data("id"),
			},'{{ route('carrera.destroy') }}',"#errSection","POST",query)
		}
	})
	
</script>
@endsection