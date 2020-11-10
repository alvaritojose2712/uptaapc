<ul class="nav justify-content-center">
  <li class="nav-item">
    <a class="nav-link active" href="/admin">Inicio</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="{{ route('ce.estudiantes.index') }}">Estudiantes</a>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Configura</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="{{ route('ce.carreras.index') }}">Carreras</a>
      <a class="dropdown-item" href="{{ route('ce.trayecto.index') }}">Trayectos</a>
     
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">RR.HH</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="{{ route('rrhh.personal') }}">Personal</a>
      <a class="dropdown-item" href="{{ route('nominas') }}">Nómina</a>
     
    </div>
  </li>
  <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Presupuesto</a>
    <div class="dropdown-menu">
      <a class="dropdown-item" href="{{ route('presupuesto.index') }}">Inicio</a>
     
    </div>
  </li>
</ul>
