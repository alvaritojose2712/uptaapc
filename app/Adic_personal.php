<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Adic_personal extends Model
{
    public function division() { 
        return $this->belongTo('App\sno_nominas',"id","id_nomina"); 
    }
}
