<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Partidas_presupuestaria extends Model
{
    public function ordinario(){
    	return $this->hasMany("App\Presupuesto_ordinario","codigo","partida");
    }
}
