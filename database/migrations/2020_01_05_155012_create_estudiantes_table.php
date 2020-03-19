<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estudiantes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombres');
            $table->string('apellidos');
            $table->date('nacimiento');
            $table->enum('sexo',["Masculino","Femenino"]);
            $table->string('l_trabajo')->nullable();
            $table->string('estado_civil');
            $table->string('direccion');
            $table->string('ciudad');
            $table->string('estado');
            $table->string('telefono');
            $table->integer("cedula")->unsigned();
            $table->foreign("cedula")->references("cedula")->on("users")->onUpdate("cascade")->onDelete("cascade");

            $table->boolean('trabaja');
            $table->integer('hijos');

            $table->string('observacion')->nullable();

            $table->string('nameFolder')->nullable();
            $table->string('file_cedula')->nullable();
            $table->string('file_fondo_negro')->nullable();
            $table->string('file_notas')->nullable();
            $table->string('file_foto')->nullable();
            $table->string('file_const_traba')->nullable();
            $table->string('file_sintesis')->nullable();

            $table->string('file_pago')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estudiantes');
    }
}
