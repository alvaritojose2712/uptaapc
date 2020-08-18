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

            $table->integer("id_uc")->unsigned();
            $table->foreign("id_uc")->references("id")->on("ucs")->onUpdate("cascade");

            $table->integer("id_profesor")->unsigned();
            $table->foreign("id_profesor")->references("id")->on("personals")->onUpdate("cascade");
            

            $table->integer("id_estudiante")->unsigned();
            $table->foreign("id_estudiante")->references("id")->on("personals")->onUpdate("cascade");

            $table->integer("id_seccion")->unsigned();
            $table->foreign("id_seccion")->references("id")->on("seccions")->onUpdate("cascade");

            $table->unique(['id_uc', 'id_profesor',"id_estudiante"]);

            $table->boolean("inscripcion")->default(0);
            $table->boolean("editable")->default(1);

            $table->integer("dia");
            $table->integer("mes");
            $table->integer("ano");


            $table->string("trayecto");
            $table->enum("trimestre",["I","II","III","IV"]);

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
