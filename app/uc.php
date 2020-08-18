<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class uc extends Model
{
    public function prela() { 
        return $this->hasMany('App\prelaciones_uc',"id_uc","id"); 
    }
    public function categoria() { 
        return $this->hasOne('App\categoria',"id","id_categoria"); 
    }
}
