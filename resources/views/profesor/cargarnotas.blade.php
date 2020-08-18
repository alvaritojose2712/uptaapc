@extends('layouts.app')
@section('nav')
	@include("profesor.nav")
@endsection
@section('content')
	<div id="appreact"></div>
	<script src="{{ asset('js/profesor.cargarnotas.js') }}"></script>
@endsection