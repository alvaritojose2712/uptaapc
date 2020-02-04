@if (!count($data))
    <h2 class="text-center">¡Nada que mostrar! :(</h2>
@endif
<div class="accordion" id="accordionExample">
    @foreach ($data as $e)
        <div class="card">
            <div class="card-header" id="headingOne">
            <h2 class="mb-0 optionsHide">
                
                <table class="table table-borderless" style="margin:0">
                    <tr>
                        <td style="padding:0">
                            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne{{$e->id}}" aria-expanded="true" aria-controls="collapseOne{{$e->id}}">
                                {{$e->nombres}} - <strong>{{ $e->apellidos }}</strong>


                            </button>
                        </td>
                        <td style="padding:0">
                            <div class="btn-group pull-right">
                                <a href="/seminario/{{$e->id}}/edit" class="btn btn-warning"><i class="fa fa-pencil fa-2x"></i></a>
                                <a href="/seminario/{{$e->id}}" class="btn btn-warning"><i class="fa fa-eye fa-2x"></i></a>
                                <form action="/seminario/{{$e->id}}" method="post" class="btn btn-danger" onClick="confirm('¿Realmente quiere eliminar?')?$(this).submit():null">
                                    @csrf
                                    @method("DELETE")
                                    <i class="fa fa-trash fa-2x"></i>
                                </form>
                            </div>
                        </td>
                    </tr>
                </table>
            </h2>
            </div>
    
            <div id="collapseOne{{$e->id}}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div class="card-body">
                    <table class="table table-borderless table-striped">
                            <tr><th>Cédula </th> <td>{{$e->Cédula}}</td></tr>
                            <tr><th>Lugar de trabajo </th> <td>{{$e->l_trabajo}}</td></tr>
                    </table>
                </div>
            </div>
        </div>
        
        
    @endforeach
</div>