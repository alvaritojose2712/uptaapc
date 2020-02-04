@extends('layouts.app')
@section('tittle',"Inicio")
@section('content')
<div class="container-fluid mt-3 mb-3">
    <div class="row">
        <div class="col">
            <div class="form-group pb-2">
                <div class="form-inline">
                  <div class="md-form my-0">
                      <input class="form-control mr-sm-2" type="text" name="q" placeholder="Buscar..." aria-label="Search">
                  </div>
                </div>
            </div>
            <div class="addDataAjax">
                
            </div>
        </div>
    </div>
</div>

<script>
    $(function() {
        req("","/seminario/items",".addDataAjax")
    });
   
    $(document).on('keyup','[name="q"]', function(){

        req({q:$(this).val()},"/seminario/items",".addDataAjax")
    });
</script>
@endsection 
