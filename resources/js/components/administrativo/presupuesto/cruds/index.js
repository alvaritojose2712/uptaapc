import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';



import Partidas from './partidas';
import AccionesProyectos from './acciones-proyectos'
import AccionesEspecificas from './acciones-especificas'
import PresupuestoOrdinario from './presupuesto-ordinario'
import MovimientosPresupuestarios from './movimientos-presupuestarios'


class App extends Component{
	constructor(props){
		super()

		this.state = {
			component: null,
		}
		this.changeProps = this.changeProps.bind(this)
	}
	changeProps(event){
		let uri = event.target.attributes["data-uri"].value

		this.setState({
			component:uri,
		})

	}
	render(){
		let {component} = this.state
		return(
			<div className="">
				 <div className="p-2 d-flex align-items-center btn-group">
 						<button
 							className={component==="Partidas"?"btn-primary":"btn-outline-primary"+(" btn")}
 							data-uri="Partidas" onClick={this.changeProps}>
 							Partidas
 						</button>
 						<button
 							className={component==="AccionesProyectos"?"btn-primary":"btn-outline-primary"+(" btn")}
 							data-uri="AccionesProyectos" onClick={this.changeProps}>
 							Acciones centralizadas y/o Proyectos
 						</button>
 						<button
 							className={component==="AccionesEspecificas"?"btn-primary":"btn-outline-primary"+(" btn")}
 							data-uri="AccionesEspecificas" onClick={this.changeProps}>
 							Acciones específicas
 						</button>
 						<button
 							className={component==="PresupuestoOrdinario"?"btn-primary":"btn-outline-primary"+(" btn")}
 							data-uri="PresupuestoOrdinario" onClick={this.changeProps}>
 							Presupuesto ordinario
 						</button>
 						<button
 							className={component==="MovimientosPresupuestarios"?"btn-primary":"btn-outline-primary"+(" btn")}
 							data-uri="MovimientosPresupuestarios" onClick={this.changeProps}>
 							Movimientos presupuestarios
 						</button>
 				</div>
 				<div className="p-2 bg-light rounded">
 					{component==="Partidas"?<Partidas/>:null}
 					{component==="AccionesProyectos"?<AccionesProyectos/>:null}
 					{component==="AccionesEspecificas"?<AccionesEspecificas/>:null}
 					{component==="PresupuestoOrdinario"?<PresupuestoOrdinario/>:null}
 					{component==="MovimientosPresupuestarios"?<MovimientosPresupuestarios/>:null}
 				</div>
			</div>

		);
	}
}

render(<App/>,document.getElementById('appreact'));
