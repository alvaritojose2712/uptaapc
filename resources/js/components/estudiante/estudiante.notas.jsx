import React, {Component} from 'react';


class App extends Component{
	constructor(){
		super()
		this.state = {

			id_notas:null,
			id_trimestre:null,
			id_trayecto:null,
			
		}
		this.changeState = this.changeState.bind(this)
	}
	
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}

	
	render(){
		let { 
			id_notas,
			id_trimestre,
			id_trayecto,
		} = this.state
		let {estudiante,inscribir} = this.props
		return(
			<React.Fragment>
				{(id_notas!==null&&
				id_trayecto!==null&&
				id_trimestre!==null&&
				estudiante&&
				estudiante.academico[id_trayecto]&&
				estudiante.academico[id_trayecto][id_trimestre].length)?
				<table className="table">
					<thead>
						<tr>
							<td colSpan="7">
								<h1 className="text-right">
									
									{
										estudiante.academico[id_trayecto][id_trimestre][id_notas].inscripcion===0
										?
										<div className="">
											<h1>
											<span className="badge badge-warning">Materia Ofertada</span>
											<a href="#" className="h6 badge-dark badge" onClick={inscribir?()=>inscribir(estudiante.academico[id_trayecto][id_trimestre][id_notas].id):null}> <i className="fa fa-pencil"></i></a>
											</h1>
										</div>

										:(estudiante.academico[id_trayecto][id_trimestre][id_notas].notas.length
											?<span className="badge badge-success">Notas cargadas</span>
											:<span className="badge badge-primary">Materia inscrita</span>)
									}
								</h1>
							</td>
						</tr>
						<tr>
							<td colSpan="7" className="text-danger"><i className="fa fa-times hover" onClick={()=>this.changeState({id_notas:null,id_trayecto:null,id_trimestre:null})}></i></td>
						</tr>
						<tr>
								<th>Trayecto</th>
								<th>Trimestre</th>
								<th>Sección</th>
								<th>Unidad Curricular</th>
								<th>Profesor</th>
								<th>Duración(Semanas)</th>
								<th>UC</th>
							</tr>
						<tr className={(estudiante.academico[id_trayecto][id_trimestre][id_notas].inscripcion?(estudiante.academico[id_trayecto][id_trimestre][id_notas].notas.length?"table-success":"table-primary"):"table-warning")}>
							<td>{id_trayecto}</td>
							<td>{id_trimestre}</td>
							<td>{estudiante.academico[id_trayecto][id_trimestre][id_notas].seccion.nombre}</td>
							<td>{estudiante.academico[id_trayecto][id_trimestre][id_notas].uc.nombre}</td>
							<td>{estudiante.academico[id_trayecto][id_trimestre][id_notas].profesor.nombre} {estudiante.academico[id_trayecto][id_trimestre][id_notas].profesor.apellido}</td>
							<td>{estudiante.academico[id_trayecto][id_trimestre][id_notas].uc.duracion}</td>
							<td>{estudiante.academico[id_trayecto][id_trimestre][id_notas].uc.u_credito}</td>
						</tr>
						<tr>
							<th colSpan="4">Modo</th>
							<th colSpan="3">Puntuación</th>
						</tr>
						{estudiante.academico[id_trayecto][id_trimestre][id_notas].notas.map((e,i)=>
							<tr key={i}>
								<td colSpan="4" className="h3">{e.modo}</td>
								<td colSpan="3" className="h1">{e.puntos}</td>
							</tr>
							)}
					</thead>
				</table>
				:Object.keys(estudiante.academico).map((e,i)=>
					<table className="table" key={(i)}>
						<tbody>
							<tr> 
								<td colSpan="5" className="h1 text-center">
								{e}
								</td>
							</tr>
							{Object.keys(estudiante.academico[e]).map((ee,ii)=>
							<React.Fragment key={(i+ii)}>
							<tr>
								<th></th>
								<th>Sección</th>
								<th>Unidad Curricular</th>
								<th>Profesor</th>
								<th>Duración(Semanas)</th>
								<th>UC</th>
							</tr>
							<tr>
								<td rowSpan={estudiante.academico[e][ee].length+1} className="h3 text-center">
								{ee}
								</td>
							</tr>
							{estudiante.academico[e][ee].map((eee,iii)=>
								<tr key={(i+ii+iii)} onClick={()=>this.changeState({id_notas:iii,id_trayecto:e,id_trimestre:ee})} className={(eee.inscripcion?(eee.notas.length?"table-success":"table-primary"):"table-warning")+" hover"}>
									<td>{eee.seccion.nombre}</td>
									<td>{eee.uc.nombre}</td>
									<td>{eee.profesor.nombre} {eee.profesor.apellido}</td>
									<td>{eee.uc.duracion}</td>
									<td>{eee.uc.u_credito}</td>
								</tr>
							)}
							</React.Fragment>
							)}
						</tbody>
					</table>
				)
				}
			</React.Fragment>				
		);
	}
}
export default App;