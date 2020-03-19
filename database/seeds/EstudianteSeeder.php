<?php

use Illuminate\Database\Seeder;

class EstudianteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr = [];
        $items = [];
        for ($i=0; $i < 100 ; $i++) { 
        	array_push($items,[
        		"Alvaro",
        		"Ospino",
        		"1998-12-27",
        		"Masculino",
        		"UPT",
        		"Soltero",
        		"Mantecal",
        		"Mantecal",
        		"Apure",
        		"04261234567",
        		"267671".$i,
        		1,
        		2,
        		"alvaroospino".$i."@gmail.com",
        		now(),
        		'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
        		3,
        		3,
                1
        	]);
        }
        
        foreach ($items as $e) {
            array_push($arr,[
                "name" => $e[0],
				"cedula"=>$e[10],
				"email"=>$e[13],
				"password"=>$e[15],
				"carrera"=>$e[16],
                "role"=>$e[17],
				"inscrito"=>$e[18],
				
				
            ]);
        }
        DB::table("users")->insert($arr);
        $arr = [];

        foreach ($items as $e) {
            array_push($arr,[
                "nombres" => $e[0],
                "apellidos" => $e[1],
                "nacimiento" => $e[2],
                "sexo" => $e[3],
                "l_trabajo" => $e[4],
                "estado_civil" => $e[5],
                "direccion" => $e[6],
                "ciudad"=>$e[7],
				"estado"=>$e[8],
				"telefono"=>$e[9],
				"cedula"=>$e[10],
				"trabaja"=>$e[11],
				"hijos"=>$e[12],
				
            ]);
        }
        DB::table("estudiantes")->insert($arr);


    }
}
