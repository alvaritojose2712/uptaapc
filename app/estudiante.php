<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class estudiante extends Model
{
    public function user() { 
        return $this->hasOne('App\User',"cedula","cedula"); 
    }
    

}
