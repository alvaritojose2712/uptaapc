<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    public function nombreCarrera() { 
        return $this->hasOne('App\carrera',"id","carrera"); 
    }
    use Notifiable;

    
    protected $fillable = [
        'name', 'email', 'password', 'cedula', 'disponible', 'role' , 'carrera'
    ];

   
    public function carrera() { 
        return $this->hasOne('App\carrera',"id","carrera"); 
    }
}
