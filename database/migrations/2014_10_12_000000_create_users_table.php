<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->string('email')->unique();
            $table->integer('cedula')->unique()->unsigned();
            $table->string('password');
            $table->enum('role',[1,2,3]);
            $table->boolean("verificado")->default(0);
            $table->boolean("inscrito")->default(0);
            $table->integer("carrera")->unsigned()->nullable(true);

            $table->foreign("carrera")->references("id")->on("carreras")->onUpdate("cascade");
            $table->rememberToken();
            $table->timestamps();
        });
        DB::table("users")->insert([
            // [
            //     "name"=>"Alvaro Ospino", 
            //     "email"=>"alvaroospino79@gmail.com", 
            //     "cedula"=>26767116, 
            //     "password"=>Hash::make("12345678"),
            //     "role"=>3,
            //     "carrera"=>3,
            // ],
            // [
            //     "name"=>"Silfredo Rivero", 
            //     "email"=>"silfre@gmail.com", 
            //     "cedula"=>9868006, 
            //     "password"=>Hash::make("12345678"),
            //     "role"=>2,
            //     "carrera"=>4,
            // ],
            [
                "name"=>"Admin", 
                "email"=>"admin@gmail.com", 
                "cedula"=>12345678, 
                "password"=>Hash::make("12345678"),
                "role"=>1,
                "carrera"=>NULL,
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
