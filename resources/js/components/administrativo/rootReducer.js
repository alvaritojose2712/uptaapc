import {combineReducers} from 'redux';
import nomina from './recursos_humanos/nomina/reducers/nominaReducer';
import busqueda from './recursos_humanos/crud/reducers/busquedaReducer';
import partidas from './presupuesto/reducers/partidasReducer';
import accionesProyectos from './presupuesto/reducers/accionesProyectosReducer';
import formsPresupuesto from './presupuesto/reducers/formsReducer';


export default combineReducers({
	partidas:  partidas,
	busqueda:  busqueda,
	accionesProyectos: accionesProyectos,
	formsPresupuesto: formsPresupuesto,
	nomina: nomina,
})
