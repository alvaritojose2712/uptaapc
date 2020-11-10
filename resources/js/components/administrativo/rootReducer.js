import {combineReducers} from 'redux';
import nomina from './recursos_humanos/nomina/reducers/nominaReducer';
import partidas from './presupuesto/reducers/partidasReducer';
import accionesProyectos from './presupuesto/reducers/accionesProyectosReducer';
import formsPresupuesto from './presupuesto/reducers/formsReducer';
import utilidad from './utilidadReducer';


export default combineReducers({
	partidas:  partidas,
	accionesProyectos: accionesProyectos,
	formsPresupuesto: formsPresupuesto,
	utilidad: utilidad,
	nomina: nomina,
})