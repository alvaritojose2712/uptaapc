function formatMoneda(value, decimals=2, separators=['.',".",',']) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
}
function formatCedula(val) {
    val = val.toString()
    let count = 1
    let format = ""
    for (let i = val.length-1; i >= 0; i--) {
        format = val[i]+format
        if (count%3==0) {
            format = "."+format
        }
        count++
    }
    return format
}
function formatPartida(val){
    val = val.toString()
	let v = ""; 
	let num = 1
	for(let i = val.length-1; i>=0; i--){
	  v = val[i]+v
	  if (num%2==0) {
	    v = "."+v
	  }
	  num++;
	}
	v = (v[0]==".")?v.substr(1):v
	return v
}
function diffFecha(fecha) {
    let f = Date.parse(fecha);
    let f2 = Date.now();
    let t = new Date(f-f2);
    
    return Math.round((((f2-f)/(3600*24*1000))/365));
}



function diffdatefull(fromDate,toDate) {
    
    try {
        
        var result = getDateDifference(new Date(fromDate), new Date(toDate));
        
        if (result && !isNaN(result.years)) {
            return (result.years==0?"":(result.years + ' año' + (result.years == 1 ? ' ' : 's '))) + (result.months==0?"":(result.months + ' mes' + (result.months == 1 ? ' ' : 'es '))) + (result.days==0?"":(result.days + ' día' + (result.days == 1 ? '' : 's')))
        }
    } catch (e) {
        console.log(e);
    }
}
    
    function getDateDifference(startDate, endDate) {
        if (startDate > endDate) {
            console.log('Start date must be before end date');
            return null;
        }
        var startYear = startDate.getFullYear();
        var startMonth = startDate.getMonth();
        var startDay = startDate.getDate();
        
        var endYear = endDate.getFullYear();
        var endMonth = endDate.getMonth();
        var endDay = endDate.getDate();
        
        // We diffdatefull February based on end year as it might be a leep year which might influence the number of days.
        var february = (endYear % 4 == 0 && endYear % 100 != 0) || endYear % 400 == 0 ? 29 : 28;
        var daysOfMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        
        var startDateNotPassedInEndYear = (endMonth < startMonth) || endMonth == startMonth && endDay < startDay;
        var years = endYear - startYear - (startDateNotPassedInEndYear ? 1 : 0);
        
        var months = (12 + endMonth - startMonth - (endDay < startDay ? 1 : 0)) % 12;
        
        // (12 + …) % 12 makes sure index is always between 0 and 11
        var days = startDay <= endDay ? endDay - startDay : daysOfMonth[(12 + endMonth - 1) % 12] - startDay + endDay;
        
        return {
        years: years,
        months: months,
        days: days
        };
    }
    
    function formatNumber(n) {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    
    function inputMoneda(val){
        if (val.indexOf(",") >= 0) {
            var decimal_pos = val.indexOf(",");
            var left_side = val.substring(0, decimal_pos);
            var right_side = val.substring(decimal_pos);
            left_side = formatNumber(left_side);
            right_side = formatNumber(right_side);
            right_side = right_side.substring(0, 2);
            return left_side + "," + right_side;

        }
        return formatNumber(val)
    }
    function removeMoneda(val) {
        return parseFloat(val.replace(/\./g,"").replace(/,/g,"."))
    }

    function getDiaSemana(date){
            let fecha=new Date(date);


            let dias=['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', "Domingo"];
            return dias[fecha.getDay()]

    }
    function retDivisa(divisa){
		return divisa==1?"USD": (divisa==2?"COP": (divisa==3?"Bs.":""));
    }
    
    function getTodayDate() {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        if(dd<10){dd='0'+dd;} 

        if(mm<10){mm='0'+mm;} 

        return yyyy+"-"+mm+"-"+dd
    }
    function getDataForm(target){
    let form = new FormData(target)
    let data = {}
    for(let key of form.entries()){
     data[key[0]] = key[1]
    }
    return data;
}
let leerTxt = (e,callback)=>{
    let archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    let lector = new FileReader();
    lector.onload = e => {
    let contenido = e.target.result;
    
        callback(contenido
            .replace(/\r/g,"")
            .split(/\n/)
            .map(e=>e?e.split(/\t/).filter(ee=>ee&&ee.length):null)
            .filter(e=>e&&e.length)
        )
        
    };
    lector.readAsText(archivo,"ISO-8859-1");
}
function lenValLimit(val,len){
    val = val.substr(0,len).replace(/[^0-9]/g,"")
    return val
}
export {
    formatCedula,
    formatMoneda,
    formatPartida,
    diffFecha,
    diffdatefull,
    inputMoneda,
    removeMoneda,
    getDiaSemana,
    retDivisa,
    getTodayDate,
    getDataForm,
    leerTxt,
    lenValLimit,
}