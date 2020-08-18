<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePersonalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personals', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string("nombre");
            $table->string("apellido");
            $table->integer("cedula")->unique();
            $table->string("nacionalidad")->index()->nullable(true);
            $table->foreign('nacionalidad')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("genero")->index()->nullable(true);
            $table->foreign('genero')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("estado_civil")->index()->nullable(true);
            $table->foreign('estado_civil')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->text("direccion")->nullable(true);
            $table->string("fecha_nacimiento");
            $table->string("telefono_1");
            $table->string("telefono_2")->nullable(true);
            $table->string("correo")->unique();
            $table->string("categoria")->index()->nullable(true);
            $table->foreign('categoria')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("cargo")->index()->nullable(true);
            $table->foreign('cargo')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("dedicacion")->index()->nullable(true);
            $table->foreign('dedicacion')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("estado")->index()->nullable(true);
            $table->foreign('estado')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("estatus")->index()->nullable(true);
            $table->foreign('estatus')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("grado_instruccion")->index()->nullable(true);
            $table->foreign('grado_instruccion')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("fecha_ingreso")->nullable(true);
            $table->boolean("caja_ahorro")->nullable(true);
            $table->string("cuenta_bancaria")->nullable(true);
            $table->string("antiguedad_otros_ieu")->nullable(true);
            $table->integer("hrs_nocturnas")->nullable(true);
            $table->integer("hrs_feriadas")->nullable(true);
            $table->integer("hrs_diurnas")->nullable(true);
            $table->integer("hrs_feriadas_nocturnas")->nullable(true);
            $table->string("profesion")->index()->nullable(true);
            $table->foreign('profesion')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("departamento_adscrito")->index()->nullable(true);
            $table->foreign('departamento_adscrito')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');
            $table->string("cargo_departamento")->index()->nullable(true);
            $table->foreign('cargo_departamento')->references('valor')->on('sno_valores_personals')
            ->onUpdate('cascade');

            $table->string('observacion')->nullable();
            
            $table->boolean('trabaja')->default(1);

            $table->string('nameFolder')->nullable();
            $table->string('file_cedula')->nullable();
            $table->string('file_fondo_negro')->nullable();
            $table->string('file_notas')->nullable();
            $table->string('file_foto')->nullable();
            $table->string('file_const_traba')->nullable();
            $table->string('file_sintesis')->nullable();
            $table->string('file_pago')->nullable();

            $table->string('n_carnet')->nullable();

            $table->string('calzado')->nullable();
            $table->string('gorra')->nullable();
            $table->string('camisa')->nullable();
            $table->string('pantalon')->nullable();

            $table->string('password')->nullable();
            
            $table->enum('role',[1,2,3])->default(1);
            
            $table->boolean("verificado")->default(0);
            $table->boolean("inscrito")->default(0);
            $table->boolean("prosecucion")->default(0);
            
            
            $table->integer("carrera")->unsigned()->nullable(true);
            $table->foreign("carrera")->references("id")->on("carreras")->onUpdate("cascade");
            $table->rememberToken();
            
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
        Schema::dropIfExists('personals');
    }
}
