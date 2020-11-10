@extends('layouts.app')
@section('nav')
	@include("profesor.nav")
@endsection
@section('content')
		<script src="{{ asset('js/profesor.dashboard.js') }}"></script>
@endsection
