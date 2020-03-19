<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class categoria extends Model
{
    public function ucs()
    {
    	return $this->hasMany('App\uc',"id_categoria","id");
    }
}
