<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSnoCondicionesFormulasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sno_condiciones_formulas', function (Blueprint $table) {
            $table->increments('id');
            $table->string('valor')->index();
            $table->foreign('valor')
            ->references("valor")
            ->on("sno_valores_personals")
            ->onUpdate("cascade");
            $table->integer("id_formula")->unsigned();
            $table->foreign("id_formula")
            ->references("id")
            ->on("sno_formulas")
            ->onUpdate("cascade");
            $table->string("operador",10);
            $table->boolean("type")->default(0); //0 Si es condición de personal y 1 para condicion del número de hijos del personal
            $table->string("campo",25)->default(""); // Campo (campos de la tabla hijos) para condición de hijo;
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
        Schema::dropIfExists('sno_condiciones_formulas');
    }
}
