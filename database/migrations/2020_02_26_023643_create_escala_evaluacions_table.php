<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEscalaEvaluacionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('escala_evaluacions', function (Blueprint $table) {
            $table->increments('id');
            $table->float('reprobado',10,2);
            $table->float('repite',10,2);
            $table->float('especial',10,2);
            $table->float('aprobado',10,2);
            $table->timestamps();
        });

        DB::table("escala_evaluacions")->insert([
            ["reprobado"=> 6, "repite"=> 8, "especial"=>10,"aprobado"=>12],
            ["reprobado"=> 6, "repite"=> 10, "especial"=>12,"aprobado"=>16],
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('escala_evaluacions');
    }
}
