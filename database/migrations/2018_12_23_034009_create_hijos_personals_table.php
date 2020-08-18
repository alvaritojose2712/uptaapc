<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHijosPersonalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('hijos_personals', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            
            $table->string('parentesco');
            $table->string('nombre');
            $table->string('apellido');
            $table->enum('genero',["Masculino","Femenino"]);
            $table->date('fecha_nacimiento');
            $table->integer('cedula');
            $table->string('correo');
            $table->string('telefono_1');

            $table->boolean("estudia")->default(0);
            $table->boolean("discapacidad")->default(0);



            $table->integer('cedula_representante')->index();
            $table->foreign('cedula_representante')
            ->references('cedula')
            ->on('personals')
            ->onDelete('cascade')
            ->onUpdate('cascade');

           
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
        Schema::dropIfExists('hijos_personals');
    }
}
