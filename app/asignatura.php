<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class asignatura extends Model
{
    public function profesor()
    {
    	return $this->hasOne('App\profesor',"id","id_profesor");
    }

    public function uc()
    {
    	return $this->hasOne('App\uc',"id","id_uc");
    }
}
