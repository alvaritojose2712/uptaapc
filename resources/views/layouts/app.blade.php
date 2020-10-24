<!doctype html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <link rel="icon" type="image/png" href="{{ asset('uptaapc.png') }}">
    <title>UPT del Alto Apure "Pedro Camejo"</title>

    <script src="{{ asset('js/app.js') }}"></script>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
   
    @yield("scripts")
</head>
<body>
    <nav class="nav-app">
        
        <img src="{{ asset('images/sinapsis/sinapsis.svg') }}" alt="logo sinapsis" height="100%">
        <div class="nav-right">
            @if (!session()->has('role'))
                
                    <a class="mr-2 btn btn-outline-primary" href="{{ route('home') }}">Inicio</a>
                

                @if (Route::currentRouteName()!='register')
                    <a class="mr-2 btn btn-primary" href="{{ route('register') }}">Nuevo ingreso</a>
                @endif
            @else
                <ul class="navbar-nav mr-2">
                  <li class="nav-item dropdown">
                    <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                        <span class="badge badge-primary">
                            {{ session("carrera") }}
                        </span>
                        <span class="badge badge-dark">
                            {{ session("role")==1?"Administrativo":"" }}
                            {{ session("role")==2?"Profesor":"" }}
                            {{ session("role")==3?"Estudiante":"" }}
                        </span>
                        {{ session("usuario") }}
                        <span class="caret"></span>
                    </a>

                    <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                        @if (session("role")==3)
                            @if (session("verificado"))
                                <a class="dropdown-item bg-success text-light">Verificado</a>
                            @else
                                <a class="dropdown-item bg-primary text-light">En espera</a>
                            @endif
                        @endif
                        <a class="dropdown-item text-muted" href="#">
                            
                        </a>
                        <a class="dropdown-item" href="{{ route('logout') }}"
                           onclick="event.preventDefault();
                                         document.getElementById('logout-form').submit();">
                            Cerrar Sesión
                        </a>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                            @csrf
                        </form>
                    </div>
                  </li>
                </ul>
            @endif
        </div>
    </nav>
    <section class="content">
        {{-- <section id="errSection">@include("layouts.error")</section> --}}
        
        @yield('nav')
        
        <div id="appreact"></div>
        
        @yield('content')
    </section> 
     {{--  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div class="container">
                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <!-- Left Side Of Navbar -->
                    <ul class="navbar-nav mr-auto">

                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="navbar-nav ml-auto">
                        <!-- Authentication Links -->
                        @if(!session()->has('role'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">Iniciar Sesión</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">Registrar</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    <span class="badge badge-primary">
                                        {{ session("carrera") }}
                                    </span>
                                    <span class="badge badge-dark">
                                        {{ session("role")==1?"Administrativo":"" }}
                                        {{ session("role")==2?"Profesor":"" }}
                                        {{ session("role")==3?"Estudiante":"" }}
                                    </span>
                                    {{ session("usuario") }}
                                    <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    @if (session("role")==3)
                                        @if (session("verificado"))
                                            <a class="dropdown-item bg-success text-light">Verificado</a>
                                        @else
                                            <a class="dropdown-item bg-primary text-light">En espera</a>
                                        @endif
                                    @endif
                                    <a class="dropdown-item text-muted" href="#">
                                        
                                    </a>
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        Cerrar Sesión
                                    </a>
                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
                    </ul>
                </div>
            </div>
      </nav> --}}
    
</body>
</html>
