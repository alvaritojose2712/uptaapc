<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrayectosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trayectos', function (Blueprint $table) {
            $table->increments('id');

            $table->integer("id_asignatura")->unsigned();
            $table->foreign("id_asignatura")->references("id")->on("asignaturas")->onUpdate("cascade");

            $table->integer("id_estudiante")->unsigned();
            $table->foreign("id_estudiante")->references("id")->on("estudiantes")->onUpdate("cascade");

            $table->integer("id_seccion")->unsigned();
            $table->foreign("id_seccion")->references("id")->on("seccions")->onUpdate("cascade");

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
        Schema::dropIfExists('trayectos');
    }
}
