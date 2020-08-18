<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class prelaciones_uc extends Model
{
    public function uc() { 
        return $this->hasOne('App\uc',"id","prela"); 
    }
}
