<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sno_condiciones_nomina extends Model
{
	protected $fillable = ["valor","id_nomina"];
    public function valorall() { 
        return $this->hasOne('App\sno_valores_personal',"valor","valor"); 
    }
}
