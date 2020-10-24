import React, {Component} from 'react';
import { Link, Route } from 'react-router-dom'
import Partidas from './partidas/partidasIndex';
import accionesProyectos from './acciones_proyectos/accionProyectosIndex';
import Crud from '../crud/';

export default class Presupuesto extends Component {
	render(){
		const {match} = this.props
		return(
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-auto d-flex align-items-center">
								<div className="btn-group btn-group-sm btn-group-vertical">
									<Link className="btn btn-primary" to={`${match.url}`}>
										<i className="fa-2x fa fa-home" title="Inicio"></i> 
									</Link>
									<a className="btn btn-primary" href="/presupuesto/cruds">
										<i className="fa-2x fa fa-wpforms" title="Formularios"></i> 
									</a>
									<Link className="btn btn-primary" to={`${match.url}/partidas`}>
										<i className="fa-2x fa fa-calculator" title="Partidas Presupuestaria"></i> 
									</Link>
									<Link className="btn btn-primary" to={`${match.url}/acciones_proyectos`}>
										<i className="fa-2x fa fa-book" title="Acciones / Proyectos"></i>					
									</Link>
									<Link className="btn btn-primary" to={`${match.url}/crud`}>
										Crud				
									</Link>
								</div>
						</div>
						<div className="col">
							<div className="container-fluid h-100 flex">
								<Route path={`${match.url}/partidas/:partida?`} component={Partidas}/>
								<Route path={`${match.url}/acciones_proyectos`} component={accionesProyectos}/>
								<Route 
								path={`${match.url}/crud`} 
								render={
									props => 
									// <Crud {...props} resource="/presupuesto/partidas/" primary="codigo" model="partidas" title="Partidas presupuestarias"/>
									<Crud {...props} resource="/presupuesto/movimientos_presupuestarios/" primary="id" model="movimientos" title="Movimientos presupuestarios"/>
								}
								/>
							</div>
						</div>
					</div>
				</div>
		);
	};


};

