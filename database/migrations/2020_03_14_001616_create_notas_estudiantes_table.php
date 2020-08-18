<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotasEstudiantesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notas_estudiantes', function (Blueprint $table) {
            $table->increments('id');
            
            $table->string("modo")->default("Final");//RR RE Normal
            $table->float("puntos")->default(0);
            $table->integer("id_trayecto")->unsigned();
            $table->foreign("id_trayecto")->references("id")->on("trayectos")->onUpdate("cascade");
            $table->unique(["modo","puntos","id_trayecto"]);
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
        Schema::dropIfExists('notas_estudiantes');
    }
}
