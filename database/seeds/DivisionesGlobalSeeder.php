<?php

use Illuminate\Database\Seeder;

class DivisionesGlobalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table("divisiones_globals")->insert([
            [   
                "denominacion" => "Pago único",
                "porcentaje" => "100",
            ],
            [   
                "denominacion" => "1era quincena",
                "porcentaje" => "100",
            ],
            [   
                "denominacion" => "2da quincena",
                "porcentaje" => "100",
            ],
            [   
                "denominacion" => "1era quincena",
                "porcentaje" => "50",
            ],
            [   
                "denominacion" => "2da quincena",
                "porcentaje" => "50",
            ],
            [   
                "denominacion" => "1era semana",
                "porcentaje" => "25",
            ],
            [   
                "denominacion" => "2da semana",
                "porcentaje" => "25",
            ],
            [   
                "denominacion" => "3era semana",
                "porcentaje" => "25",
            ],
            [   
                "denominacion" => "4ta semana",
                "porcentaje" => "25",
            ],
        ]);
    }
}
