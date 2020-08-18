<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class seccion extends Model
{
    public function carrera() { 
        return $this->hasOne('App\carrera',"id","id_carrera"); 
    }
}
