<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sno_formulas_asignadas extends Model
{
    public function formula() { 
        return $this->hasOne('App\sno_formulas_versiones',"id","id_formula"); 
    }
}
