@extends('layouts.app')
@section('nav')
	@include("admin.nav")
@endsection
@section('content')
	<script src="{{ asset('js/presupuesto.cruds.js') }}"></script>
@endsection