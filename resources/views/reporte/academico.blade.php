

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title></title>
	<style>
		header{
			text-align: center;
		}
		table{
			width: 100%;
			color: #212529;
		  border-collapse: collapse;
		}
		th, td {
		  padding: 15px;
		  text-align: left;
		}
		table, th, td {
		  border: 1px solid black;
		}
		.logo-header{
			width: 200px;
		}
		.text-right{
			text-align: right;
		}
		.fecha{
			color: #818181;
			text-anchor: 1px;

		}
		.h3{
			font-size: 2em;
		}
		.h2{
			font-size: 3em; 
		}
		.text-success{
			color:green;
		}
		.pl-2{
			padding-left: 20px;
		}
		.bold{
			font-weight: bold;
		}

	</style>
</head>
<body>
	<header>
		<img src="{{public_path("images/uptaapc/cintillo.png")}}" alt="Don Guido" class="logo-header">
	</header>
	<div class="border border-dark p-3">
		{{$nombrecarrera["nombre"]}}
	</div>
		<table class="table">
			<tr>
				<td><span class="bold">Nombres y Apellidos:</span> {{$nombre}} {{$apellido}}</td>
				<td><span class="bold">Sección:</span> {{$seccion}}</td>
			</tr>
			<tr>
				<td><span class="bold">Cédula de identidad:</span> {{$cedula}}</td>
				<td><span class="bold">Periodo académico:</span> {{$periodo}}</td>
			</tr>
			<tr>
				<td></td>
				<td><span class="bold">Fecha de inscripción:</span> {{$fecha_incripcion}}</td>
			</tr>
		</table>
	<h3 class="text-right fecha">{{Date::parse(date("Y-m-d"))->format('l, j \de F Y')}}</h3>
</body>
</html>