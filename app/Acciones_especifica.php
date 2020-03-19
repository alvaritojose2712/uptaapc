<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Acciones_especifica extends Model
{
    public function acciones_proyecto()
    {
    	return $this->belongsTo('App\Acciones_proyecto',"acciones_proyectos_id","id");
    }
    public function ordinario()
    {
    	return $this->hasMany('App\Presupuesto_ordinario',"ae");
    }
}
