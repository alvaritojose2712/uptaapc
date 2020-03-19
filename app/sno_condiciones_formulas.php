<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sno_condiciones_formulas extends Model
{
    public function valorall() { 
        return $this->hasOne('App\sno_valores_personal',"valor","valor"); 
    }
}
