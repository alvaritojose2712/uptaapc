<?php 
namespace App\Traits;
trait RestoreSession {
	public static function restoreSession($d){
        session([
            "id" => $d->id,
            "role" => $d->role,
            "cedula" => $d->cedula,
            "carrera" => ($d->role==1||$d->role==2)?$d->categoria:($d->carrera?$d->nombrecarrera->nombre:""),
            "usuario" => $d->nombre,
            "verificado" => $d->verificado,
            "inscrito" => $d->inscrito,
        ]);
    }
}
 ?>