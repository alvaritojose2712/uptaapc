<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Divisiones_formula extends Model
{
    public function division() { 
        return $this->hasOne('App\Divisiones_global',"id","id_division"); 
    }
    public function formula() { 
        return $this->hasOne('App\sno_formulas_versiones',"id","id_formula"); 
    }
}
