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
            $table->timestamps();
        });

        DB::table("carreras")->insert([
            ["nombre"=>"PNF Informática"],
            ["nombre"=>"PNF Mecánica"],
            ["nombre"=>"PNF Civil"],
            ["nombre"=>"PNF Agroalimentación"],
            ["nombre"=>"PNF Veterinaria"],
        ]);
    }

    public function down()
    {
        Schema::dropIfExists('carreras');
    }
}
