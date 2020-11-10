<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class trayecto extends Model
{
    protected $fillable = [
        "dia",
        "mes",
        "ano",
        "trayecto",
        "trimestre",
        "id_uc",
        "id_profesor",
        "id_seccion",
        "id_estudiante",
    ];
    public function estudiante()
    {
        return $this->hasOne("App\personal","id","id_estudiante");
    }

    public function profesor()
    {
    	return $this->hasOne('App\personal',"id","id_profesor");
    }

    public function uc()
    {
    	return $this->hasOne('App\uc',"id","id_uc");
    }
    public function seccion()
    {
        return $this->hasOne("App\seccion","id","id_seccion");
    }

    public function notas()
    {
        return $this->hasMany("App\\notas_estudiantes","id_trayecto","id");
    }
}
