<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sno_tablas_sueldos extends Model
{
    public function sueldos() { 
        return $this->hasMany('App\sno_sueldos',"id_tabla","id"); 
    }
}
