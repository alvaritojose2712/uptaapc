<ul class="nav justify-content-center">
  {{-- <li class="nav-item">
    <a class="nav-link active" href="#">Activo</a>
  </li> --}}
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Configura</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="{{ route('ce.asignatura.index') }}">Asignatura</a>
      <a class="dropdown-item" href="{{ route('ce.carreras.index') }}">Carreras</a>
      {{-- <a class="dropdown-item" href="{{ route('carrera.index') }}">Carrera</a> --}}
      {{-- <a class="dropdown-item" href="">Unidad Curricular</a> --}}
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Verifica</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="{{ route('verificarCuenta',["t"=>"aspirante"]) }}">Aspirante</a>
      <a class="dropdown-item" href="{{ route('verificarCuenta',["t"=>"profesor"]) }}">Profesor</a>
    </div>
  </li>
  {{-- <li class="nav-item">
    <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
  </li> --}}
</ul>
<hr>