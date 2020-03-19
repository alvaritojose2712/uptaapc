<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Acciones_proyecto extends Model
{
    public function especificas()
    {
    	return $this->hasMany('App\Acciones_especifica',"acciones_proyectos_id");
    }
}
