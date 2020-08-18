<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePrelacionesUcsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('prelaciones_ucs', function (Blueprint $table) {
            $table->increments('id');
            $table->integer("id_uc")->unsigned();
            $table->foreign("id_uc")->references("id")->on("ucs")->onUpdate("cascade");

            $table->integer("prela")->unsigned();
            $table->foreign("prela")->references("id")->on("ucs")->onUpdate("cascade");

            $table->unique(["id_uc","prela"]);
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
        Schema::dropIfExists('prelaciones_ucs');
    }
}
