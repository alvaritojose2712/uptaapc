<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\estudiante;
use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

$factory->define(estudiante::class, function (Faker $faker) {
    return [
        //
        "nombres" => $faker->firstName,
		"apellidos" => $faker->lastName,
		"cedula" => $faker->randomNumber(8),
		"nacimiento" => $faker->date(),
		"sexo" => $faker->randomElement(["Masculino","Femenino"]),
		"l_trabajo" => "Mantecal",
		"estado_civil" => $faker->randomElement(["Soltero","Casado"]),
		"direccion" => "Barrio Nuevo",
		"ciudad" => "Mantecal",
		"estado" => "Barinas",
		"telefono" => "04267656789",
		"email" => $faker->email,
		"trabaja" => 1,
		"hijos" => 2, 
    ];
});

