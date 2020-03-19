<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sno_formulas_versiones extends Model
{
    public function denominacion() { 
        return $this->hasOne('App\sno_formulas',"id","id_formula"); 
    }
    
}
