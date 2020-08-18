@extends('layouts.app')
@section('nav')
	@include("admin.nav")
@endsection

@section('content')
	<div id="appreact"></div>
	<script src="{{ asset('js/ce.carreras.js') }}"></script>
@endsection