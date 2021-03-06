<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class carrera extends Model
{
    protected $fillable = ["nombre","disponible"];

    public function categorias()
    {
    	return $this->hasMany('App\categoria',"id_carrera","id");
    }

    public function secciones()
    {
    	return $this->hasMany('App\seccion',"id_carrera","id");
    }
}
