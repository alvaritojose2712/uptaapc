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
            
            $table->string("modo")->default("Final");//RR RE Normal //Contenido 1
            $table->float("puntos")->default(0);
            $table->integer("id_trayecto")->unsigned();
            $table->foreign("id_trayecto")->references("id")->on("trayectos")->onUpdate("cascade");
            $table->unique(["modo","puntos","id_trayecto"]);

            $table->string("nombre"); // "Las matas"
            $table->date("fecha_entrega");
            $table->boolean("completado")->default(0); 

            $table->string("uniqid"); // "Las matas"
            
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
