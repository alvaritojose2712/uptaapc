<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ucs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre')->unique();
            $table->integer('u_credito');
            $table->integer('duracion'); //Semanas
            
            $table->enum("trayecto",["I","II","III","IV","V","VI"]);
            $table->integer("id_categoria")->unsigned();
            $table->foreign("id_categoria")->references("id")->on("categorias")->onUpdate("cascade");

            $table->integer("id_escala")->unsigned();
            $table->foreign("id_escala")->references("id")->on("escala_evaluacions")->onUpdate("cascade");
            $table->timestamps();
        });

        DB::table("ucs")->insert([
            ["nombre"=>"MySQL I", "id_categoria"=>1, "trayecto"=>"I","duracion"=>12,"u_credito"=>3, "id_escala"=>1],
            ["nombre"=>"Satélites", "id_categoria"=>2, "trayecto"=>"I","duracion"=>12,"u_credito"=>3, "id_escala"=>1],
            ["nombre"=>"JavaScript", "id_categoria"=>3, "trayecto"=>"I","duracion"=>12,"u_credito"=>3, "id_escala"=>1],
            ["nombre"=>"Fluídos I", "id_categoria"=>4, "trayecto"=>"I","duracion"=>12,"u_credito"=>3, "id_escala"=>1],
            ["nombre"=>"Energías libres", "id_categoria"=>5, "trayecto"=>"I","duracion"=>12,"u_credito"=>3, "id_escala"=>1],
            ["nombre"=>"Termodinámica I", "id_categoria"=>5, "trayecto"=>"I","duracion"=>12,"u_credito"=>3, "id_escala"=>1],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ucs');
    }
}
