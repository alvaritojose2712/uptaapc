<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categorias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre')->unique();
            $table->integer("id_carrera")->unsigned();
            $table->foreign("id_carrera")->references("id")->on("carreras")->onUpdate("cascade");
            $table->timestamps();
        });


        DB::table("categorias")->insert([
            ["nombre"=>"Base de datos", "id_carrera"=>1],
            ["nombre"=>"Redes  y telecomunicaciones", "id_carrera"=>1],
            ["nombre"=>"Programación", "id_carrera"=>1],
            ["nombre"=>"Fluídos", "id_carrera"=>2],
            ["nombre"=>"Energía", "id_carrera"=>2],
            ["nombre"=>"Álgebra", "id_carrera"=>2],
            ["nombre"=>"Materiales", "id_carrera"=>3],
            ["nombre"=>"Topografía", "id_carrera"=>3],
            ["nombre"=>"Fotosíntesis", "id_carrera"=>4],
            ["nombre"=>"Morfología", "id_carrera"=>5],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categorias');
    }
}
