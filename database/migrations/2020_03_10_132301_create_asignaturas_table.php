<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAsignaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('asignaturas', function (Blueprint $table) {
            $table->increments('id');

            $table->integer("id_uc")->unsigned();
            $table->foreign("id_uc")->references("id")->on("ucs")->onUpdate("cascade");

            $table->integer("id_profesor")->unsigned();
            $table->foreign("id_profesor")->references("id")->on("profesors")->onUpdate("cascade");
            
            $table->unique(['id_uc', 'id_profesor']);
            
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
        Schema::dropIfExists('asignaturas');
    }
}
