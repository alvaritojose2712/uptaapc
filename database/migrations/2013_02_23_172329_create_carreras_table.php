<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCarrerasTable extends Migration
{

    public function up()
    {
        Schema::create('carreras', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre')->unique();
            $table->boolean('disponible')->default(1);
            $table->boolean('proximamente')->default(0);
            $table->timestamps();
        });

        DB::table("carreras")->insert([
            ["nombre"=>"PNF Informática","proximamente"=>0],
            ["nombre"=>"PNF Mecánica","proximamente"=>0],
            ["nombre"=>"PNF Civil","proximamente"=>0],
            ["nombre"=>"PNF Agroalimentación","proximamente"=>0],
            ["nombre"=>"PNF Veterinaria","proximamente"=>0],

            ["nombre"=>"Odontología","proximamente"=>1],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('carreras');
    }
}
