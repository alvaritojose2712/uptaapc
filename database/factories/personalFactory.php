<?php

use Faker\Generator as Faker;

$factory->define(App\personal::class, function (Faker $faker) {
    return [
         
					"role" => 3,

	        "nombre" => $faker->name,
					"apellido" => $faker->lastName,
					"cedula" => $faker->unique()->randomNumber(8),
					"correo" => $faker->email,
					"password" => \Hash::make(12345678),
					"carrera" => $faker->randomElement([1,2,3,4]),
					"prosecucion" => 0,
					"inscrito" => 1,
					"verificado" => 1,
					"n_carnet" => $faker->randomNumber(7),
					"nacionalidad" => "V",
					"genero" => $faker->randomElement(["Masculino","Femenino"]),
					"fecha_nacimiento" => $faker->date(),
					"estado_civil" => "Soltero",
					"direccion" => $faker->address,
					"telefono_1" => $faker->randomNumber(7),
					"telefono_2" => $faker->randomNumber(7),
					"cuenta_bancaria" => $faker->randomNumber(7),
					"observacion" => "Nada",
					"calzado" => 0,
					"gorra" => 0,
					"camisa" => 0,
					"pantalon" => 0,
					"trabaja" => 1,

					"nameFolder"=>"public/docsEstudiante/ 2020-03-27 1585268890",
            "file_cedula"=>"storage/docsEstudiante/ 2020-03-27 1585268890/file_cedula.jpeg",
            "file_fondo_negro"=>"storage/docsEstudiante/ 2020-03-27 1585268890/file_fondo_negro.jpeg",
            "file_notas"=>"storage/docsEstudiante/ 2020-03-27 1585268890/file_notas.jpeg",
            "file_foto"=>"storage/docsEstudiante/ 2020-03-27 1585268890/".$faker->randomElement([
                "1w",
                "2m",
                "3w",
                "4w",
                "5w",
                "6w",
                "7w",
                "8m",
                "9w",
                "10m",
            ]).".jpg",
    ];
});


