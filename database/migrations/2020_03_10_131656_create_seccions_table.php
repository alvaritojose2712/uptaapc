<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSeccionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('seccions', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre')->unique();
            $table->integer("id_carrera")->unsigned();
            $table->foreign("id_carrera")->references("id")->on("carreras")->onUpdate("cascade");
            $table->timestamps();
        });
        DB::table("seccions")->insert([
            ["nombre"=>"Vietnam I", "id_carrera"=>1],
            ["nombre"=>"Vietnam II", "id_carrera"=>1],
            ["nombre"=>"Portugal I", "id_carrera"=>1],
            ["nombre"=>"Portugal II", "id_carrera"=>1],
            ["nombre"=>"Vietnam III", "id_carrera"=>1],
            ["nombre"=>"La estacada I", "id_carrera"=>1],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('seccions');
    }
}
