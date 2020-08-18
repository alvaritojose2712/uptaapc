@extends('layouts.app')
@section('nav')
	@include("estudiante.nav")
@endsection

@section('content')
	<script src="{{ asset('js/estudiantes.academico.js') }}"></script>
@endsection