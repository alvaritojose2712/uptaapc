import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {formatCedula,estatusNota} from '../../assets/custom';

import {handleNotification,Notification} from './handleNotification.jsx';
import {Headestudiante,Generalestudiante} from './estudiante/head.estudiante.jsx';

const loc = window.location.origin

function TareasComponent({state,changeState,inscribir}){
  	let {
  		estudiante,
  		
  		id_trayecto,
  		id_trimestre,
  		id_seccion,
  		id_materia,

  	} = state
  	let estudiantes = [];
  	try{
  		estudiantes = estudiante.academico[id_trayecto][id_trimestre][id_seccion][id_materia][0]
	  	return (
	  		<React.Fragment>
	  			<div className="card">
	  				<table className="table table-borderless">
			  			<thead>
			  				<tr>
			  					<td className="4">
										<h1>
				  						{
												!estudiantes.se_puede_inscribir 
												?	
													<React.Fragment>
														<span className="badge badge-warning mr-2">No se puede inscribir</span> <br/>
														<p className="text-muted">{estudiantes.inscripcion_motivo.map((e,i)=><span key={i} >{e}<br/></span>)}</p>
													</React.Fragment>
												:
												!estudiantes.inscripcion
												?
													<React.Fragment>
														<span className="badge badge-warning">Materia Ofertada</span>
														<a href="#" className="h6 badge-dark badge" data-id={estudiantes.id} onClick={inscribir}> <i className="fa fa-pencil"></i></a>
													</React.Fragment>
												:
												estudiantes.notas.length
												?
												<span className="">Promedio. <span className="badge badge-dark mr-2">{estudiantes.promedio}</span> <span className={("badge badge-")+estatusNota(estudiantes.estatus)}>{estudiantes.estatus}</span> 
												</span>
												:
												<span className="badge badge-primary">Materia inscrita</span>
											}
										</h1>
			  					</td>
			  				</tr>
	  						<tr>
	  							<td className="4">
				  					<h3>
				  						<span className="text-primary">{id_trayecto}</span> / <span className="text-primary">{id_trimestre}</span> / <span className="text-primary">{id_seccion}</span> / <span className="text-primary">{id_materia}</span>
				  					</h3>
	  							</td>
	  						</tr>
								<tr>
									<th>Categoría / Nombre UC</th>
									<th>Unidades Crédito</th>
									<th>Duración / Semanas</th>
									<th>Trayecto</th>
								</tr>
							</thead>
							<tbody>
						  	<tr>
										<td>.
										 {estudiantes.uc.categoria.nombre} / {estudiantes.uc.nombre}</td>
										<td>{estudiantes.uc.u_credito}</td>
										<td>{estudiantes.uc.duracion}</td>
										<td>{estudiantes.uc.trayecto}</td>
						  	</tr>
							</tbody>
						</table>
	  				<table className="table">
		  				<tbody>
		  					<tr>
	  							<td colSpan="4">
				  					<h3 className="text-center">
				  						<span>Profeso{(estudiantes.profesor.genero==="Masculino"?"r":"ra")}</span>
				  					</h3>
	  							</td>
	  						</tr>
		  					<tr>
									<td><div className="img-sm" style={{backgroundImage:"url('"+loc+"/"+estudiantes.profesor.file_foto+"')"}}></div></td>
									<td>{estudiantes.profesor.nombre} {estudiantes.profesor.apellido}</td>
									<td><span className={"badge badge-"+(estudiantes.profesor.genero==="Masculino"?"primary":"warning")}>{estudiantes.profesor.genero}</span></td>
									<td>{formatCedula(estudiantes.profesor.cedula)}</td>
			    			</tr>	
		  				</tbody>
		  			</table>
	  			</div>
					<ul className="list-group">
						{estudiantes["notas"].map(e=>
						  <a href="#" key={e.id} className={(e.completado?"list-group-item-success":"")+(" list-group-item list-group-item-action")}>
					    	<div className="text-right">
					    		<h2><span className="badge badge-primary">{e.puntos}</span></h2>
					    	</div>
						    <div className="d-flex w-100 justify-content-between">
						      <h5 className="mb-1">{e.nombre}</h5>
						      <small>{e.fecha_entrega}</small>
						    </div>
						    <p className="mb-1">{e.modo}</p>
					      <small className="text-muted">{e.created_at}</small>
						  </a>
						)}
					</ul>
	  		</React.Fragment>
	  	)
  	}catch(err){
  		return <div className="text-muted text-center">¡Nada que mostrar!</div>
  	}
}
function CertificadoAcademico({state}) {
	try{
		let {id_trimestre,id_trayecto} = state
		return (<table className="table">
				<tbody>
					<tr>
						<td>
							
							{id_trayecto?
								<span>Trayecto: <span className="font-weight-bold">{id_trayecto}</span></span>
							:null}
							<hr/>
							{id_trimestre?
								<span>Trayecto: <span className="font-weight-bold">{id_trimestre}</span></span>
							:null}

						</td>
						<td>
							{id_trayecto&&id_trimestre?
								<form action="/estudiante/academicoCertificado" target="_blank">
			            <input type="hidden" name="id_trayecto" value={id_trayecto}/>
			            <input type="hidden" name="id_trimestre" value={id_trimestre}/>
									<button type="submit" className="btn btn-outline-danger">Certificado del trayecto <i className="fa fa-download"></i></button>
								</form>
							:null}
						</td>
								
					</tr>
				</tbody>
		</table>)
	}catch(err){
		return ""
	}
}


class App extends Component{
	constructor(){
		super()
		this.state = {
			estudiante:{},
			viewE:1,

			id_materia:null,
			id_seccion:null,
			id_trimestre:null,
			id_trayecto:null,

			tareas:true,
		}
		this.getApiData = this.getApiData.bind(this)

		this.changeState = this.changeState.bind(this)
		this.inscribir = this.inscribir.bind(this)
		this.search = this.search.bind(this)



	}
	componentDidMount() {
		this.search()
	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}
	inscribir(event){
		if (confirm("¿Realmente quiere inscribir la materia?")) {

			axios
			.put("/estudiante/academicos",{id:event.currentTarget.attributes["data-id"].value,inscripcion:1})
			.then(data=>{
				handleNotification(data)
				this.search()
				this.getApiData(null,"/estudiante/academicos","estudiante")
			})
			.catch(error=>handleNotification(error))
		}
	}
	search(){
		this.getApiData(null,"/estudiante/academicos","estudiante")
	}

	
	
	render(){
		let {
			estudiante,
			viewE,

			id_materia,
			id_seccion,
			id_trimestre,
			id_trayecto,

			tareas,

		} = this.state

		let academico = estudiante.academico
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						{Object.keys(estudiante).length?
							<Headestudiante estudiante={estudiante} loc={loc}/>
						:null}
					</div>
				</div>
				<div className="row">
					<div className="col-4">
						<div className="p-3">
							<h1>Mis materias</h1>
							<ul className="list-group">
								{
						    id_seccion ? <li className="list-group-item list-group-item-action list-group-item-primary"> <i className="fa fa-arrow-left" onClick={()=>this.changeState({id_seccion:null})}></i> Materias</li> :
						    id_trimestre ? <li className="list-group-item list-group-item-action list-group-item-primary"> <i className="fa fa-arrow-left" onClick={()=>this.changeState({id_trimestre:null})}></i> Secciones</li> :
						    id_trayecto ? <li className="list-group-item list-group-item-action list-group-item-primary"> <i className="fa fa-arrow-left" onClick={()=>this.changeState({id_trayecto:null})}></i> Trimestres</li> :
								!id_trayecto ? <li className="list-group-item list-group-item-action list-group-item-secondary"> Trayectos</li> :
						    null}
								
								{academico?

									<React.Fragment>
										
										{id_trayecto?
											<React.Fragment>
												
												{id_trimestre?
													<React.Fragment>
														
														{id_seccion?
															<React.Fragment>
																
																{Object.keys(academico[id_trayecto][id_trimestre][id_seccion]).map(materia=>
												    			<li className={(id_materia==materia?"list-group-item-success":"")+(" list-group-item hover pointer")} key={materia} onClick={()=>this.changeState({id_materia:materia})}>
													    			{materia} <span className="badge badge-secondary">{academico[id_trayecto][id_trimestre][id_seccion][materia].length}</span>
												    			</li>
												    		)}
											    		</React.Fragment>
														:Object.keys(academico[id_trayecto][id_trimestre]).map(seccion=>
										    			<li className="list-group-item hover pointer" key={seccion} onClick={()=>this.changeState({id_seccion:seccion})}>{seccion}</li>
										    		)}
									    		</React.Fragment>
												:Object.keys(academico[id_trayecto]).map(trimestre=>
								    			<li className="list-group-item hover pointer" key={trimestre} onClick={()=>this.changeState({id_trimestre:trimestre})}>{trimestre}</li>
								    		)}
							    		</React.Fragment>
										:Object.keys(academico).map(trayecto=>
							    		<li className="list-group-item hover pointer" key={trayecto} onClick={()=>this.changeState({id_trayecto:trayecto})}>{trayecto}</li>
							    	)}
						    	</React.Fragment>
											
										
								:null}
						  </ul>
						</div>
					</div>
					<div className="col">
						<div className="p-3">
							<h1>Tareas asignadas</h1>

							<CertificadoAcademico state={{...this.state}}></CertificadoAcademico>

							
							{ tareas && <TareasComponent state={{...this.state}} changeState={this.changeState} inscribir={this.inscribir} />}

							
						</div>
					</div>

				</div>
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));