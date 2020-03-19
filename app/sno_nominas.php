<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class sno_nominas extends Model
{
    public function condiciones() { 
        return $this->hasMany('App\sno_condiciones_nomina',"id_nomina","id"); 
    }
    public function adic_formula() { 
        return $this->hasMany('App\Adic_formula',"id_nomina","id"); 
    }
    public function adic_personal() { 
        return $this->hasMany('App\Adic_personal',"id_nomina","id"); 
    }
}
