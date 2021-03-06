<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class Presupuesto_ordinarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $arr = [];
        $arrInsert = [
            ["401010100","1741299","1"],
            ["401010300","95836","1"],
            ["401011000","536970","1"],
            ["401011200","161651","1"],
            ["401011300","177000","1"],

            ["401011801","1324141","1"],
            ["401011802","109000","1"],
            ["401013600","19754","1"],
            
            ["401030100","11400","1"],
            ["401030800","166559","1"],
            ["401030900","476413","1"],
            ["401031000","4074795","1"],
            ["401031600","10200","1"],
            ["401031800","24570","1"],
            ["401032100","609490","1"],
            ["401032200","15231","1"],
            ["401033800","38430","1"],
            ["401033900","0","1"],
            ["401034000","45707","1"],
            ["401034100","151073","1"],
            ["401039500","735","1"],
            ["401039600","25305","1"],
            ["401039700","359998","1"],
            ["401039800","4095","1"],

            ["401040400","70000","1"], 
            ["401040800","135090","1"], 
            ["401040900","5700","1"], 
            ["401041400","53496","1"], 
            ["401041500","572876","1"], 
            ["401041800","49140","1"], 
            ["401042000","137972","1"], 
            ["401042400","9633","1"], 
            ["401042600","109158","1"], 
            ["401042700","1200","1"], 
            ["401042800","5620","1"], 
            ["401045100","1260","1"], 
            ["401045200","80000","1"], 
            ["401049800","70122","1"], 
            
            ["401060100","175637","1"],
            ["401060200","185109","1"],
            ["401060300","87815","1"],
            ["401060400","58551","1"],
            ["401060500","58551","1"],
            ["401061000","446884","1"],
            ["401061100","148960","1"],
            ["401061200","99306","1"],
            ["401061300","99306","1"],
            ["401062500","114834","1"],
            ["401062600","37145","1"],
            ["401062700","36258","1"],
            ["401062800","55712","1"],
            ["401063900","1624","1"],
            ["401064100","812","1"],
            ["401064200","541","1"],
            ["401064300","541","1"],

            ["401070100","145300","1"],
            ["401070200","13335","1"],
            ["401070300","690","1"],
            ["401070400","930","1"],
            ["401070500","1560","1"],
            ["401070600","1425000","1"],
            ["401070700","174128","1"],
            ["401070800","19366","1"],
            ["401070900","7200","1"],
            ["401071100","34560","1"],
            ["401071700","40800","1"],
            ["401071800","8400","1"],
            ["401071900","510","1"],
            ["401072000","540","1"],
            ["401072100","1170","1"],
            ["401072200","585000","1"],
            ["401072300","53701","1"],
            ["401072500","10710","1"],
            ["401072700","46080","1"],
            ["401076300","1851","1"],
            ["401076500","30","1"],
            ["401076600","30","1"],
            ["401076700","15000","1"],
            ["401076800","1975","1"],
            ["401077400","71600","1"],
            ["401077500","13125","1"],
            ["401077600","900","1"],
            ["401077700","1290","1"],
            ["401077800","10010","1"],
            ["401077900","1380000","1"],
            ["401078000","127552","1"],
            ["401078200","15390","1"],
            ["401078400","51840","1"],
            ["401079500","1725","1"],
            ["401079600","667005","1"],
            ["401079700","360000","1"],
            ["401079900","509130","1"],

            ["401080100","775423","1"],
            ["401080200","517888","1"],
            ["401080300","259677","1"],
            ["401080700","5877","1"],

            ["403080200","8721","1"],

            ["403080000","0","2"],	
            ["403080200","0","2"],	
            ["403180100","0","2"],	
            ["403189900","0","2"],	
            ["403190100","0","2"],	
            ["407010101","0","2"],	
            ["407010102","415968","2"],	
            ["407010109","0","2"],	
            ["407010110","0","2"],	
            ["407010111","0","2"],	
            ["407010112","0","2"],	
            ["407010113","0","2"],	
            ["407010114","14296","2"],	
            ["407010115","0","2"],	
            ["407010116","12874","2"],	
            ["407010174","0","2"],	
            ["407010175","0","2"],	
            ["407010201","0","2"],	
            ["407010202","0","2"],	
            ["407010303","0","2"],	
            ["407010304","0","2"],	
            ["407010305","0","2"],	
            ["407010313","0","2"],	
            ["407010316","0","2"],	
            ["407010399","0","2"],	
            ["407010501","0","2"],	
            ["407010502","0","2"],	
            ["407010506","0","2"],	
            ["407010507","0","2"],	
            ["407010511","0","2"],	
            ["407010512","0","2"],	
            ["407010516","0","2"],	
            ["407010517","0","2"],	
            ["407010598","0","2"],	
            ["407010599","0","2"],	
            ["407010601","0","2"],	
            ["407010602","0","2"],	
            ["407010606","0","2"],	
            ["407010607","0","2"],	
            ["407010611","0","2"],	
            ["407010612","0","2"],	
            ["407010616","0","2"],	
            ["407010617","0","2"],	
            ["407010698","0","2"],	
            ["407010699","0","2"],

            ["402010100","66400","3"],
            ["402010200","0","3"],
            ["402050300","346110","3"],
            ["402050700","6500","3"],
            ["402060600","21750","3"],
            ["402060800","9000","3"],
            ["402080700","16000","3"],
            ["402081000","1760","3"],
            ["402100400","10800","3"],
            ["402100500","161060","3"],
            ["402100600","16200","3"],
            ["402100800","61500","3"],
            ["402101100","59800","3"],
            ["402109900","13500","3"],
            ["403020200","288000","3"],
            ["403029900","6000","3"],
            ["403040100","600","3"],
            ["403040400","1200","3"],
            ["403040500","27600","3"],
            ["403070100","4800","3"],
            ["403070200","59509","3"],
            ["403070300","105000","3"],
            ["403080200","100000","3"],
            ["403090100","60000","3"],
            ["403110100","120000","3"],
            ["403110200","216000","3"],
            ["403110300","216000","3"],
            ["403110500","126000","3"],
            ["403110700","338600","3"],
            ["403119900","40000","3"],
            ["403180100","476811","3"],
            ["404090100","57999","3"],
            ["404090300","100000","3"],

            ["402010100","13600","4"], 
            ["402100200","11700","4"], 
            ["402030100","100000","4"], 
            ["402080300","47200","4"], 
            ["403180100","133300","4"], 
            ["404090100","6000","4"], 
            ["404090200","33000","4"], 
            ["404090300","70200","4"], 
            ["404120400","1600","4"], 
            ["402010100","17750","5"], 
            ["402030100","36200","5"], 
            ["402030200","31500","5"], 
            ["402050100","8000","5"], 
            ["402050300","51400","5"], 
            ["402050700","24800","5"], 
            ["402060200","6000","5"], 
            ["402060300","72000","5"], 
            ["402060400","216000","5"], 
            ["402060600","1000","5"], 
            ["402060800","4368","5"], 
            ["402069900","20000","5"], 
            ["402070400","20700","5"], 
            ["402080200","7200","5"], 
            ["402080300","278302","5"], 
            ["402080900","4800","5"], 
            ["402100200","38720","5"], 
            ["402100300","28000","5"],
            ["402100400","7920","5"], 
            ["402100500","220478","5"], 
            ["402100600","12500","5"], 
            ["402100700","33000","5"], 
            ["402100800","43300","5"], 
            ["402101100","5500","5"], 
            ["402101200","70000","5"],
            ["402109900","8000","5"], 
            ["402990100","26800","5"], 
            ["403020500","3000","5"], 
            ["403060100","75000","5"], 
            ["403110100","32000","5"], 
            ["403110700","24800","5"], 
            ["403180100","133308","5"], 
            ["404030100","69213","5"], 
            ["404030200","22100","5"], 
            ["404030300","12000","5"], 
            ["404030400","23600","5"],
            ["404040500","16000","5"], 
            ["404070200","26000","5"], 
            ["404090100","64000","5"], 
            ["404090200","107000","5"], 
            ["404090300","52600","5"], 
            ["404120400","1600","5"],   
             
            ["402050300","4000","6"],
            ["402100600","80000","6"],
            ["403010100","51000","6"],
            ["403020200","27000","6"],
            ["403029900","8000","6"],
            ["403070200","6900","6"],
            ["403070300","225000","6"],
            ["403180100","133308","6"],

            ["402010100","3880","7"],
            ["402030100","1600","7"],
            ["402030200","0","7"],
            ["402050100","320","7"],
            ["402050300","480","7"],
            ["402060300","20200","7"],
            ["402060800","1200","7"],
            ["402070400","2400","7"],
            ["402080100","20000","7"],
            ["402080200","2000","7"],
            ["402080300","49500","7"],
            ["402100100","4500","7"],
            ["402100400","200","7"],
            ["402100500","6820","7"],
            ["402100700","420","7"],
            ["402100800","9200","7"],
            ["402990100","1280","7"],
            ["403090100","7600","7"],
            ["403090200","10800","7"],
            ["403100600","9000","7"],
            ["403180100","133308","7"],
            ["404070200","32000","7"],
            ["404090100","76000","7"],
            ["404090300","35000","7"],

            ["402010100","5996","8"],
            ["402050300","1000","8"],
            ["402050700","600","8"],
            ["402100500","600","8"],
            ["403020200","9000","8"],
            ["403070200","9000","8"],
            ["403090100","30000","8"],
            ["403109900","13500","8"],
            ["403180100","11154","8"],

            ["402060300","3000","9"],
            ["403070200","31100","9"],
            ["403090100","15000","9"],
            ["403100700","7500","9"],
            ["403180100","17521","9"],
            ["404030400","15000","9"],
            ["404070200","40000","9"],
            ["404070400","700","9"],   
            ["404090100","800","9"],

            ["402010100","3000","10"], 
            ["402010300","100","10"], 
            ["402030200","1500","10"], 
            ["402060600","3045","10"], 
            ["402080100","600","10"], 
            ["402080300","750","10"], 
            ["403020200","4500","10"], 
            ["403070200","2500","10"], 
            ["403090100","10000","10"], 
            ["403100700","5000","10"], 
            ["403101100","1000","10"], 
            ["403180100","6280","10"], 
            ["404010100","150","10"], 
            ["404030300","6000","10"], 
            ["404090300","1000","10"], 
            ["404120400","100","10"], 

            ["402030100","900","11"],	
            ["403070200","2500","11"],	
            ["403109900","18000","11"],	
            ["403180100","3424","11"],
            
            ["402010100","1800","12"],
            ["402050100","552","12"],
            ["402050200","1300","12"],
            ["402050300","4560","12"],
            ["402050500","8000","12"],
            ["402050700","12000","12"],
            ["402060300","12000","12"],
            ["402060800","1000","12"],
            ["402100500","14760","12"],
            ["402100800","3000","12"],
            ["402101100","1000","12"],
            ["403060100","8000","12"],
            ["403070200","15000","12"],
            ["403090100","6000","12"],
            ["403180100","17004","12"],
            ["404030400","2000","12"],
            ["404070200","4000","12"],
            ["404090100","3000","12"],
            ["404090200","8300","12"],

            ["402050300","15000","13"],	 
            ["402050400","7000","13"],	 
            ["402050500","8000","13"],	 
            ["402050700","44500","13"],	 
            ["402060300","7000","13"],	 
            ["402060800","1500","13"],	 
            ["402080300","10000","13"],	 
            ["402100500","36780","13"],	 
            ["402101100","20000","13"],	 
            ["403060100","8000","13"],	 
            ["403090100","16000","13"],	 
            ["403109900","52900","13"],	 
            ["403180100","56109","13"],	 
            ["404030100","22000","13"],	 
            ["404030400","10000","13"],	 
            ["404090100","49000","13"],	 
            ["404090200","23000","13"],	 
            ["404090300","20000","13"],	
            
            ["402030200","8000","14"],	
            ["402050300","4520","14"],	
            ["402050700","3000","14"],	
            ["402060800","1000","14"],	
            ["402080300","5500","14"],	
            ["402100500","25860","14"],	
            ["402100800","700","14"],	
            ["403090100","8000","14"],	
            ["403109900","30000","14"],	
            ["403180100","33901","14"],	
            ["404070200","2000","14"],	
            ["404090100","30000","14"],	
            ["404090200","93300","14"],	

            ["402010100","500","15"], 
            ["402010200","110200","15"], 
            ["402010300","7600","15"], 
            ["402020500","2000","15"], 
            ["402030100","8000","15"], 
            ["402050100","3000","15"], 
            ["402050300","2560","15"], 
            ["402050700","3000","15"], 
            ["402060100","4300","15"], 
            ["402060200","1000","15"], 
            ["402060400","54100","15"], 
            ["402060800","2400","15"], 
            ["402070400","2000","15"], 
            ["402080100","17200","15"], 
            ["402080300","22000","15"], 
            ["402100400","15900","15"], 
            ["402100500","9860","15"], 
            ["402100700","11200","15"], 
            ["402101100","5000","15"], 
            ["403020400","5000","15"], 
            ["403090100","13000","15"], 
            ["403100700","20000","15"], 
            ["403109900","20000","15"], 
            ["403110100","10000","15"], 
            ["403180100","62052","15"], 
            ["404030600","20000","15"], 
            ["404030700","7000","15"], 
            ["404070200","4000","15"], 
            ["404090200","7000","15"], 

            ["402010200","2400","16"], 
            ["402010300","4700","16"], 
            ["402019900","1000","16"], 
            ["402020500","2000","16"], 
            ["402030100","8500","16"], 
            ["402050100","3000","16"], 
            ["402050300","2560","16"], 
            ["402050700","4000","16"], 
            ["402060100","4300","16"], 
            ["402060200","5300","16"], 
            ["402060300","7200","16"], 
            ["402060400","51100","16"], 
            ["402060600","22000","16"], 
            ["402060800","1000","16"], 
            ["402070400","2000","16"], 
            ["402080100","7000","16"], 
            ["402080300","78700","16"], 
            ["402100400","15900","16"], 
            ["402100500","9360","16"], 
            ["402100700","16200","16"], 
            ["403180100","45316","16"], 
            ["404030300","9000","16"], 
            ["404030500","5000","16"], 
            ["404030700","7000","16"], 
            ["404040500","5000","16"], 
            ["404070200","4000","16"], 
            ["404090200","5000","16"], 

            ["402010300","44600","17"],	 
            ["402050300","2560","17"],	 
            ["402050700","3000","17"],	 
            ["402060100","2400","17"],	 
            ["402060200","7000","17"],	 
            ["402060800","10000","17"],	 
            ["402080100","2200","17"],	 
            ["402100500","6500","17"],	 
            ["403060100","1000","17"],	 
            ["403090100","8000","17"],	 
            ["403100700","20000","17"],	 
            ["403110100","10000","17"],	 
            ["403180100","19146","17"],	 
            ["404030700","2400","17"],
            
            ["402050300","23760","18"], 
            ["402050700","7000","18"], 
            ["402060800","2500","18"], 
            ["402080300","10500","18"], 
            ["402080900","1800","18"], 
            ["402100500","39940","18"], 
            ["402100800","7900","18"], 
            ["403060100","1000","18"], 
            ["403090100","16000","18"], 
            ["403110100","10000","18"], 
            ["403180100","37808","18"], 
            ["404030400","2000","18"], 
            ["404070200","4000","18"], 
            ["404090100","3000","18"], 
            ["404090200","102800","18"], 
            ["404090300","4100","18"],

            ["402010100","98400","19"],
            ["402050300","46800","19"],
            ["402050700","2500","19"],
            ["402100500","15950","19"],
            ["402100800","8800","19"],
            ["403090100","64000","19"],
            ["403180100","37831","19"],
            ["407010104","192564","19"],

            ["402060400","192000","20"],
            ["403090100","108000","20"],
            ["403180100","30720","20"],
            ["407010104","29550","20"],
            ["407010302","273314","20"],

            ["402050200","13500","21"], 
            ["402050300","22500","21"], 
            ["402060800","22200","21"], 
            ["402100300","35000","21"], 
            ["402101200","2000","21"], 
            ["403101100","15840","21"], 
            ["403180100","27552","21"], 
            ["404090100","22000","21"], 
            ["404090300","55000","21"], 
            ["407010104","11820","21"], 

            ["402010100","7900","22"], 
            ["402030200","14400","22"], 
            ["402030300","13000","22"], 
            ["402050100","1400","22"], 
            ["402050300","5860","22"], 
            ["402060300","17600","22"], 
            ["402060400","6400","22"], 
            ["402100100","41600","22"], 
            ["402100400","1600","22"], 
            ["402100500","11200","22"], 
            ["402100600","4200","22"], 
            ["402100800","5800","22"], 
            ["403070100","9800","22"], 
            ["403070400","2400","22"], 
            ["403090100","12000","22"], 
            ["403110700","1200","22"], 
            ["403180100","34010","22"], 
            ["404050100","1700","22"], 
            ["404070200","10500","22"], 
            ["404090200","44000","22"], 
            ["407010104","7880","22"], 

            ["402010100","1096000","23"],
            ["402030100","100000","23"],
            ["402030200","520000","23"],
            ["402050100","310000","23"],
            ["402050300","3042000","23"],
            ["402060300","1080000","23"],
            ["402060400","640000","23"],
            ["402100300","1200000","23"],
            ["402100500","1319000","23"],
            ["402100600","2660000","23"],
            ["402100800","1050000","23"],
            ["402990100","370000","23"],
            ["403010200","240000","23"],
            ["403070100","980000","23"],
            ["403070300","2400000","23"],
            ["403070400","1560000","23"],
            ["403090100","1600000","23"],
            ["403109900","400000","23"],
            ["403110500","200000","23"],
            ["403160100","500000","23"],
            ["403180100","4943400","23"],
            ["403990100","420000","23"],
            ["404050100","1790000","23"],
            ["404070200","3050000","23"],
            ["404070600","5870000","23"],
            ["404090200","100000","23"],
            ["407010104","28800","23"],

            ["402010100","2400","24"],
            ["402040300","510000","24"],
            ["402050300","24600","24"],
            ["402060300","10000","24"],
            ["402060600","236100","24"],
            ["402069900","21600","24"],
            ["402080300","29000","24"],
            ["402080700","2000","24"],
            ["402080900","162300","24"],
            ["402100500","1440","24"],
            ["402990100","4008","24"],
            ["403020200","6000","24"],
            ["403060300","8000","24"],
            ["403070100","11400","24"],
            ["403070200","12000","24"],
            ["403090100","38000","24"],
            ["403110200","57000","24"],
            ["403180100","205896","24"],
            ["404030100","15000","24"],
            ["404030200","82000","24"],
            ["404070600","24000","24"],
            ["404090200","20000","24"],
            ["404090300","48000","24"],

            ["402050300","1900","25"],
            ["402100500","500","25"],
            ["403109900","30000","25"],
            ["403180100","5184","25"],
            ["407010104","29550","25"],

            ["402030100","51200","26"],	
            ["403090100","210000","26"],	
            ["403180100","11232","26"],	
            ["404090300","19000","26"],	
            ["407010104","59100","26"],
            
            ["403100300","15000","27"],	
            ["403100400","30000","27"],	
            ["403109900","505000","27"],	
            ["403110100","40000","27"],	
            ["403180100","94400","27"],	

            ["403109900","33000000","28"],	 
            ["403180100","5280000","28"],	 

            ["402020500","1575000","29"],	 
            ["402030100","300000","29"],	 
            ["402050700","950000","29"],	 
            ["402060300","8400000","29"],	 
            ["402060600","201500","29"],	 
            ["402060700","700000","29"],	 
            ["402060800","7980000","29"],	 
            ["402070300","625000","29"],	 
            ["402070400","3900000","29"],	 
            ["402080100","23990000","29"],	 
            ["402080200","1250000","29"],	 
            ["402080300","13829500","29"],	 
            ["402100200","12875000","29"],	 
            ["402100500","480000","29"],	 
            ["402100700","2705000","29"],	 
            ["402100800","225000","29"],	 
            ["402101100","34305000","29"],	 
            ["402101200","12606100","29"],	 
            ["402990100","172500","29"],	 
            ["403180100","23294000","29"],	 
            ["404010101","5250000","29"],	 
            ["404010199","380000","29"],	 
            ["404030300","7500000","29"],	 
            ["404030700","1250000","29"],	 
            ["404040500","137500","29"],	 
            ["404090300","4000000","29"],	 

            ["403109900","9800000","30"],	 
            ["403110100","1250000","30"],	 
            ["403180100","1768000","30"],	 

            ["403180100","2160000","31"],	 
            ["403101000","13500000","31"],	 


        ];
        foreach($arrInsert as $key => $valor){
            array_push($arr,[
                'partida' => $valor[0],
                'denominacion' => "Ordinario ".$key,
                "monto" => $valor[1],
                "fecha" => "2019-01-01",
                "ae" => $valor[2]
            ]);
        }
        DB::table("presupuesto_ordinarios")->insert($arr);
        
    }
}
