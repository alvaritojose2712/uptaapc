import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import {handleNotification,Notification} from './handleNotification.jsx';
import {formatCedula,searchParams,today} from '../../assets/custom.js'
import EstudiantesList from './ce.estudiantesList.jsx'
import cloneDeep from 'lodash/cloneDeep';



const loc = window.location.origin


class App extends Component{
	constructor(){
		super()
		this.state = {
			view:0,
			vCrea:null,
			

			id_update:null,
			typeQuery:"crear",

			searchcarrera:"",
			searchano:"",
			searchtrayecto:"",
			searchtrimestre:"",
			searchseccion:"",
			searchuc:"",
			searchestudiante:"",
			

			trayectos:[],
			secciones:[],
			personal:[],
			uc:[],
			estudiantes:[],


			trayecto:"I",
			trimestre:"I",

			fecha:today,
			fecha_cierre:today,


			slsecciones:[],
			slprofeuc:[],
			slestudiantes:[],

			q_profesor:"",
			q_seccion:"",
			q_estudiante:"",
			q_materia:"",

			indexprofucselect:null,
			
		}
		this.getApiData = this.getApiData.bind(this)

		this.toggleItem = this.toggleItem.bind(this)


		this.changeState = this.changeState.bind(this)
		this.save = this.save.bind(this)
		this.selectEstudiante = this.selectEstudiante.bind(this)

		this.selectSeccion = this.selectSeccion.bind(this)
		this.profeuc = this.profeuc.bind(this)
		this.validTrayecto = this.validTrayecto.bind(this)
		this.postRemoveTrayecto = this.postRemoveTrayecto.bind(this)
		this.nuevoTrayecto = this.nuevoTrayecto.bind(this)





	}
	componentDidMount() {
		this.getApiData(null,"/controlEstudios/trayectos","trayectos")

		this.getApiData(null,"/controlEstudios/carreras/uc","uc")

		this.getApiData(null,"/controlEstudios/estudiantes","estudiantes",{verificado:1})


		this.getApiData(null,"/rrhh/personal","personal")
		this.getApiData(null,"/controlEstudios/carrera/secciones","secciones")

	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop,params=null){
		axios.get(url,{
			params:
			params ? params : { q: e?e.target.value:"" }
		})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}


	toggleItem(event){
		let {attributes} = event.currentTarget
		let prop = attributes["data-prop"].value
		let i = attributes["data-index"].value
		
			if(this.state["sl"+prop].filter(ee=>ee.id===this.state[prop][i].id).length){
				this.setState(st=>({
					["sl"+prop]: st["sl"+prop].filter((ee,ii)=>ee.id!==st[prop][i].id)
				}));
			}else{
				this.setState(st=>({
					["sl"+prop]: [st[prop][i]], vCrea:null,
				}));
			}
		
	}
	selectEstudiante(event){
		const { estudiantes, uc  } = this.state
		
		const {attributes} = event.currentTarget
		const i = attributes["data-index"].value
		const id = attributes["data-id"].value
		const prop = attributes["data-prop"].value


		if(this.state[prop].filter(ee=>ee.id==id).length){
			
			this.setState(st=>({
				[prop]: st[prop].filter(ee=>ee.id!=id)
			}));

		}else{

			let concat;
			switch(prop){
				case "slestudiantes":
					
					const carrera = attributes["data-carrera"].value
					concat = estudiantes[carrera][i]
				
				break;
			}
			this.setState(st=>({
				[prop]: st[prop].concat(concat)
			}));
		}


	}
	postRemoveTrayecto(ids,callback){
		if (confirm("¿Seguro de eliminar?")) {
			
			axios
			.post("/controlEstudios/trayectos",{
				id_update:ids,
				type:"delete",
			})
			.then(data=>{
				handleNotification(data)
				if (callback) {
					callback(data)
				}
				this.getApiData(null,"/controlEstudios/trayectos","trayectos")
			})
			.catch(error=>{
				handleNotification(error)
			})
		}
	}
	
	save(type=null){
		let { 
			typeQuery,

			fecha_cierre,
			fecha,
			trayecto,
			trimestre,
			slsecciones,
			slprofeuc,
			slestudiantes,
			id_update,
		} = this.state

		if (type==="delete") {
			// postRemoveTrayecto()
		}else{

			if (this.validTrayecto()) {
				axios
				.post("/controlEstudios/trayectos",{
					type: this.state.typeQuery,
					
					fecha,
					fecha_cierre,

					trayecto,
					trimestre,

					slsecciones: this.state.slsecciones[0].id,
					
					slprofeuc,
					slestudiantes,
				})
				.then(data=>{
					handleNotification(data)
					this.getApiData(null,"/controlEstudios/trayectos","trayectos")
				})
				.catch(error=>{
					handleNotification(error)
				})
			}
		}
	}

	
	selectSeccion(event){
		try{

			const {trayectos} = this.state
			const {attributes} = event.currentTarget

			const data_carrera = attributes["data-carrera"].value
			const data_ano = attributes["data-ano"].value
			const data_trayecto = attributes["data-trayecto"].value
			const data_trimestre = attributes["data-trimestre"].value
			const data_seccion = attributes["data-seccion"].value

			const data_uc = attributes["data-uc"].value
			const data_estudiante = attributes["data-estudiante"].value

			const type = attributes["data-type"].value

			let secciones;
			
			let typeQuery = "editSeccion"
			
			
			switch(type){
				case "seccion":
					secciones = Object.values(trayectos.ordenado[data_carrera][data_ano][data_trayecto][data_trimestre][data_seccion])

				break;

				case "uc":
					typeQuery = "editUc"
					secciones = [trayectos.ordenado[data_carrera][data_ano][data_trayecto][data_trimestre][data_seccion][data_uc]]

				break;

				case "estudiante":
					typeQuery = "editEstudiante"
					secciones = [[trayectos.ordenado[data_carrera][data_ano][data_trayecto][data_trimestre][data_seccion][data_uc][data_estudiante]]]

				break;

			}
			
			let slestudiantes = []
			let slprofeuc = []

			let fecha,
					fecha_cierre,
					trayecto,
					trimestre,
					slsecciones
					

			secciones.map(seccion=>{
				let slpersonal, sluc

				seccion.map(ee=>{
					if (typeof fecha==="undefined") fecha = ee.fecha
					if (typeof fecha_cierre==="undefined") fecha_cierre = ee.fecha_cierre
					if (typeof trayecto==="undefined") trayecto = ee.trayecto
					if (typeof trimestre==="undefined") trimestre = ee.trimestre

					if (typeof slsecciones==="undefined") slsecciones = [ee.seccion]

					if (type!=="seccion") {
						if (typeof slpersonal==="undefined") slpersonal = ee.profesor
						if (typeof sluc==="undefined") sluc = ee.uc
					}
					
					if (!slestudiantes.filter(e=>e.id===ee.estudiante.id).length) {
						let estudiante = ee.estudiante
						if (type!=="seccion") {
							estudiante.id_trayecto = ee.id
						}
						slestudiantes.push(estudiante)
					}
				})
				if (slpersonal&&sluc) {
					slprofeuc.push({
						profesor: slpersonal,
						uc: sluc,
					})
				}
				
			})
			this.setState({
				fecha,
				fecha_cierre,

				trayecto,
				trimestre,

				slestudiantes,

				slsecciones,

				slprofeuc,

				typeQuery
			})
			 //[ [], [], [] ]


		}
		catch(err){
			console.log(err)
		}
	}

	

	
	profeuc(event){
		const {attributes} = event.currentTarget
		const type = attributes["data-type"].value 
		const index = this.state.indexprofucselect 

		const profesor = this.state.personal 
		const uc = this.state.uc 


		let slprofeuc = cloneDeep(this.state.slprofeuc)

		switch(type){
			case "addEmpty":
				slprofeuc = slprofeuc.concat({
					profesor:{},
					uc:{},
				})
			break;

			case "remove":
				slprofeuc = slprofeuc.filter((e,i)=>i!=attributes["data-index"].value )
			break;

			case "addProfesor":
				slprofeuc[index].profesor = profesor[attributes["data-indexprofesor"].value ]
			break;

			case "addUc":
				slprofeuc[index].uc = uc[attributes["data-indexuc"].value ]
				
			break;

			

		} 

		this.setState({
			slprofeuc,
			vCrea: null,
		})
	}
	

	validTrayecto(){
		const {
			fecha,
			fecha_cierre,
			trayecto,
			trimestre,
			slsecciones,
			slprofeuc,
			slestudiantes,
		} = this.state

		let profesucs = true

		slprofeuc.map(e=>{
			if (!e.profesor.nombre||!e.uc.nombre) {profesucs = false}
		})

		return  profesucs&&
						fecha&&
						fecha_cierre&&
						trayecto&&
						trimestre&&
						slsecciones.length&&
						slprofeuc.length&&
						slestudiantes.length?true:false
	}
	nuevoTrayecto(){
		this.setState({
			id_update:null,
			typeQuery:"crear",
			trayecto:"I",
			trimestre:"I",
			fecha:today,
			fecha_cierre:today,
			slsecciones:[],
			slprofeuc:[],
			slestudiantes:[],
			indexprofucselect:null,
		})
	}
	
	
	
	render(){
		let { 
			view,
			vCrea,
			id_update,
			trayectos,
			secciones,
			personal,
			uc,
			estudiantes,
			trayecto,
			fecha,
			fecha_cierre,
			trimestre,
			slsecciones,

			slprofeuc,
			
			slestudiantes,

			searchcarrera,
			searchano,
			searchtrayecto,
			searchtrimestre,
			searchseccion,
			searchuc,
			searchestudiante,

			q_profesor,
			q_seccion,
			q_estudiante,
			q_materia,

			typeQuery

		} = this.state
	
		return(
			<React.Fragment>
				<Notification />
				<div className="container-fluid">
					<div className="row mt-4 mb-4">
						<div className="col text-center">
							<h4>
								Creación y configuración de
							</h4>
							<h1>trayectos</h1>
							<h6>{typeQuery}</h6>
						</div>
					</div>
					<div className="row">
						<div className="col-4 mh-500">
							<h3>Creados</h3>
							
							<div className="tnz-file-tree">
								{trayectos.ordenado?
									Object.entries(trayectos.ordenado).map((carrera,icarrera)=>
										searchcarrera===""||carrera[0].toString().substr(0,searchcarrera.length)===searchcarrera?
										<label className="tnz-file-tree-item year" key={icarrera}>
											<input className="tnz-file-tree-cb" type="checkbox"/>

		                  <span className="tnz-file-tree-label">{carrera[0]}</span>

											<div className="tnz-file-tree-branches">
												{Object.entries(carrera[1]).map((ano,iano)=>
													searchano===""||ano[0].toString().substr(0,searchano.length)===searchano?
													<label className="tnz-file-tree-item month" key={iano}>
														
														<input className="tnz-file-tree-cb" type="checkbox"/>
	                      		<span className="tnz-file-tree-label">{ano[0]}</span>

														<div className="tnz-file-tree-branches">
															
															{Object.entries(ano[1]).map((trayecto,itrayecto)=>
																searchtrayecto===""||trayecto[0].toString().substr(0,searchtrayecto.length)===searchtrayecto?
																<label className="tnz-file-tree-item day" key={itrayecto}>
																	<input className="tnz-file-tree-cb" type="checkbox"/>
	                              	<span className="tnz-file-tree-label">{trayecto[0]}</span>
																	
																	<div className="tnz-file-tree-branches">
																		
																		{Object.entries(trayecto[1]).map((trimestre,itrimestre)=>
																			searchtrimestre===""||trimestre[0].toString().substr(0,searchtrimestre.length)===searchtrimestre?
																			<label className="tnz-file-tree-item hour" key={itrimestre}>
																				
																				<input className="tnz-file-tree-cb" type="checkbox"/>
	                              				<span className="tnz-file-tree-label">{trimestre[0]}</span>

																				<div className="tnz-file-tree-branches">

																					<div className="form-group-search">
																						<input type="text" value={searchseccion} className="searchEstudiante" onChange={e=>this.changeState({searchseccion:e.target.value})} placeholder="Buscar..."/>
																					</div>
																					{Object.entries(trimestre[1]).map((seccion,iseccion)=>
																						searchseccion===""||seccion[0].toString().substr(0,searchseccion.length).toLowerCase()===searchseccion.toLowerCase()?
																						<label className="tnz-file-tree-item hour" key={iseccion}>
																							<input className="tnz-file-tree-cb" type="checkbox"/>
	                              							<span 
	                              							onClick={this.selectSeccion} 
	                              							data-carrera={carrera[0]}
																							data-ano={ano[0]}
																							data-trayecto={trayecto[0]}
																							data-trimestre={trimestre[0]}
	                              							data-seccion={seccion[0]}
	                              							data-uc=""
				                              				data-estudiante=""
									                            data-type="seccion"

	                              							className="tnz-file-tree-label" 
	                              							>{seccion[0]}</span>

																							<div className="tnz-file-tree-branches">
																								<div className="form-group-search">
																									<input type="text" value={searchuc} className="searchEstudiante" onChange={e=>this.changeState({searchuc:e.target.value})} placeholder="Buscar..."/>
																								</div>
																								{Object.entries(seccion[1]).map((uc,iuc)=>
																									searchuc===""||uc[0].toString().substr(0,searchuc.length).toLowerCase()===searchuc.toLowerCase()?
																									<label className="tnz-file-tree-item hour" key={iuc}>
																										<input className="tnz-file-tree-cb" type="checkbox"/>
	                              										<span 
	                              										onClick={this.selectSeccion} 
				                              							data-carrera={carrera[0]}
																										data-ano={ano[0]}
																										data-trayecto={trayecto[0]}
																										data-trimestre={trimestre[0]}
				                              							data-seccion={seccion[0]}
				                              							data-uc={uc[0]}
				                              							data-estudiante=""
									                              		data-type="uc"

	                              										className="tnz-file-tree-label"
	                              										><i className="fa fa-book"></i> {uc[0]}</span>
																										
																										
																										<div  className="tnz-file-tree-branches">
																											<div className="form-group-search">
																												<input type="text" value={searchestudiante} className="searchEstudiante" onChange={e=>this.changeState({searchestudiante:e.target.value})} placeholder="Buscar..."/>
																											</div>
																											<label htmlFor="">
																												<table className="table table-borderless table-sm">
																													<tbody>
																														{uc[1].map((e,i)=>
																															searchParams(searchestudiante,e.estudiante,["nombre","apellido","cedula"])&&
																													  	<tr
																													  	onClick={this.selectSeccion} 
									                              							data-carrera={carrera[0]}
																															data-ano={ano[0]}
																															data-trayecto={trayecto[0]}
																															data-trimestre={trimestre[0]}
									                              							data-seccion={seccion[0]}
									                              							data-uc={uc[0]}
									                              							data-estudiante={i}

									                              							data-type="estudiante"

																													  	key={e.estudiante.id} 
																													  	data-id={e.id} 
																													  	className={" hover"}>
																												  			<td>
																												  				<img src={`${loc}/${e.estudiante.file_foto}`} alt="" className="mr-1 img-sm" />
																												  			</td>
																												  			<td className="table-nombre-estudiante">{e.estudiante.nombre} {e.estudiante.apellido}</td>
																												  			<td className="table-cedula-estudiante">{formatCedula(e.estudiante.cedula)}</td>
																													  	</tr>
																													  	
																														)}
																													</tbody>
																												</table>
																											</label>
																										</div>
																									</label>
																									:null
																								)}
																							</div>
																						</label>
																						:null
																					)}
																				</div>
																			</label>
																			:null
																		)}
																	</div>
																</label>
																:null
															)}
														</div>

													</label>
													:null
												)}
											</div>
										</label>
										:null
									)
								:null}
							</div>

						</div>
						<div className="col padding-null rounded mh-500">				
							<div className="padding-null col">
								<div className="boton-fixed">
									<button 
										className={"btn-waring btn btn-xl btn-circle m-2"} 
										onClick={this.nuevoTrayecto}>
											<i className={"fa fa-file"}></i>
									</button>
									<button 
										className={(this.validTrayecto()?"btn-success":"btn-dark")+" btn btn-xl btn-circle m-2"} 
										disabled={!this.validTrayecto()}
										onClick={this.save}>
											<i className={"fa fa-"+(typeQuery==="crear"?"send":"pencil")}></i>
									</button>
									
									{
										id_update!==null?
											<button 
												className="btn-danger btn btn-xl btn-circle m-2"
												onClick={()=>this.save("delete")}>
													<i className="fa fa-trash"></i>
											</button>
										:null
									}
								</div>


								{id_update!==null?
									<button className="btn btn-danger m-3" onClick={()=>this.changeState({id_update:null})}>
										<i className="fa fa-times"></i> Cancelar Modo Edición
									</button>
								:null
								}
								{vCrea!==null
									? ( <div className="p-3" >
										<i className="fa fa-times hover mb-3" onClick={()=>this.changeState({vCrea:null})}></i>										
												
										{vCrea===0&&
											<div>
												<div className="form-group">
													<div className="input-group">
													  <div className="input-group-prepend">
													    <span className="input-group-text">Inicio</span>
													  </div>
													  <input type="date" className="form-control" value={fecha} onChange={e=>this.changeState({typeQuery:"crear",fecha:e.target.value})}/>
													</div>

													<div className="input-group">
													  <div className="input-group-prepend">
													    <span className="input-group-text">Cierre</span>
													  </div>
													  <input type="date" className="form-control" value={fecha_cierre} onChange={e=>this.changeState({typeQuery:"crear",fecha_cierre:e.target.value})}/>
													</div>
												</div>
												<div className="form-group">
													<h3>Trayecto</h3>
													<select value={trayecto} onChange={e=>this.changeState({typeQuery:"crear","trayecto":e.target.value})} className="form-control">
														<option value="I">I</option>
														<option value="II">II</option>
														<option value="III">III</option>
														<option value="IV">IV</option>
														<option value="V">V</option>
														<option value="VI">VI</option>

													</select>
												</div>
												<div className="form-group">
													<h3>Trimestre</h3>
													<select value={trimestre} onChange={e=>this.changeState({typeQuery:"crear","trimestre":e.target.value})} className="form-control">
														<option value="I">I</option>
														<option value="II">II</option>
														<option value="III">III</option>
														<option value="IV">IV</option>
													</select>
												</div>		
											</div>
										}
										{vCrea===1&&
											<div>
												<h3>Secciones</h3>
												<div className="form-group">
													<input type="text" placeholder="Buscar..." onChange={e=>this.changeState({q_seccion:e.target.value})} value={q_seccion} className="form-control"/>
												</div>
												<table className="table table-borderless">
													<tbody>
													{secciones.map((e,i)=>
														searchParams(q_seccion,e,["id","nombre"])&&
												  	<tr key={e.id} onClick={this.toggleItem} data-prop="secciones" data-index={i} className={(slsecciones.filter(ee=>ee.id===e.id).length>0&&"alert-primary")+" hover"}>
												  		<td>{e.nombre}</td>
												  		<td>{e.carrera.nombre}</td>
												  	</tr>
													)}
													</tbody>
												</table>
											</div>
										}
										{vCrea===2&&
											<div>
												<h3>Profesor</h3>
												<div className="form-group">
													<input type="text" placeholder="Buscar..." onChange={e=>this.changeState({q_profesor:e.target.value})} value={q_profesor} className="form-control"/>
												</div>
												<table className="table table-borderless">
													<tbody>
													{personal.map((e,i)=>
														  slprofeuc.filter(ee=>ee.profesor.id===e.id).length==0 && searchParams(q_profesor,e,["nombre","apellido","cedula","correo"])&&
													  	<tr key={e.id} style={{display:e.role==2?"":"none"}} onClick={this.profeuc} data-type="addProfesor" data-indexprofesor={i} className={"hover"}>
													  			
													  			<td><div className="mr-1 img-sm" style={{backgroundImage: `url('${loc}/${e.file_foto}')` }}></div></td>
													  			<td>{e.nombre} {e.apellido}</td>
													  			<td>{formatCedula(e.cedula)}</td>
													  			<td>{e.correo}</td>
													  			<td><span className="badge badge-secondary">{e.categoria}</span></td>
													  	</tr>
															// :null}
													)}
													</tbody>
												</table>
											</div>
										}
										{vCrea===3&&
											<div>
												<h3>UC's</h3>
												<div className="form-group">
													<input type="text" placeholder="Buscar..." onChange={e=>this.changeState({q_materia:e.target.value})} value={q_materia} className="form-control"/>
												</div>
												<table className="table table-borderless">
									  			<thead>
														<tr>
															<th>Nombre</th>
															<th>Unidades Crédito</th>
															<th>Duración / Semanas</th>
															<th>Trayecto</th>
														</tr>
													</thead>
													<tbody>
														{slsecciones.length?
															uc.map((e,i)=>
																	slsecciones[0].carrera.nombre===e.categoria.carrera.nombre?
																	slprofeuc.filter(ee=>ee.uc.id===e.id).length==0 && searchParams(q_materia,e,["id","nombre"])&&
															  	<tr key={e.id} onClick={this.profeuc} data-type="addUc" data-indexuc={i} className={"hover"}>
																			<td>{e.categoria.carrera.nombre} / {e.categoria.nombre} / {e.nombre}</td>
																			<td>{e.u_credito}</td>
																			<td>{e.duracion}</td>
																			<td>{e.trayecto}</td>
															  	</tr>
															  	:null
															)
													  :<tr><td><small className="text-muted">¡Seleccione una sección!</small></td></tr>}

													  {
													  	slsecciones.length?
														  	uc.filter(e=>slsecciones[0].carrera.nombre===e.categoria.carrera.nombre).length==0 
														  	&&
														  	<tr><td><small className="text-muted">¡Sin unidades curriculares para esta carrera!</small></td></tr>
													  	:null
														}
													</tbody>
												</table>
											</div>
										}
										{vCrea===4&&
											<React.Fragment>
												<h3>Estudiantes</h3>
												<div className="form-group">
													<input type="text" placeholder="Buscar..." onChange={e=>this.changeState({q_estudiante:e.target.value})} value={q_estudiante} className="form-control"/>
												</div>
												<div className="tnz-file-tree">
													{Object.entries(estudiantes).map((carrera,indexCarrera)=>
														<label className="tnz-file-tree-item year" key={indexCarrera}>
															<input className="tnz-file-tree-cb" type="checkbox"/>
									        		<span className="tnz-file-tree-label">{carrera[0]} <span className="badge alert-primary">{carrera[1].filter(estudiante=>(searchParams(q_estudiante,estudiante,["nombre","apellido","cedula"]))).length}</span></span>
															<div className="tnz-file-tree-branches">
																<label>
																	<table className="table table-borderless">
																		<tbody>
																		{	
																			carrera[1].map((estudiante,indexEstudiante)=>
																				searchParams(q_estudiante,estudiante,["nombre","apellido","cedula"])
																				&&
																				<tr key={indexEstudiante} data-index={indexEstudiante} data-id={estudiante.id} data-carrera={carrera[0]} onClick={this.selectEstudiante} data-prop="slestudiantes" className={(slestudiantes.filter(e=>e.id==estudiante.id).length?"table-success":"")+" hover"}>
																					<td>
																						<img src={`${loc}/${estudiante.file_foto}`} className={("mr-1 img-sm border ")+(estudiante.verificado?"border-success":(estudiante.inscrito?"border-warning":"border-danger"))} />
																					</td>
																					<td className="table-nombre-estudiante">{estudiante.nombre} {estudiante.apellido}</td>
																					<td className="table-cedula-estudiante">{formatCedula(estudiante.cedula)}</td>
																					<td className="table-cedula-estudiante">{estudiante.nombrecarrera?estudiante.nombrecarrera.nombre:"Sin carrera"}</td>
																		  	</tr>
																			)
																		}
																		</tbody>
																	</table>
																</label>
															</div>
														</label>
													)}
												</div>
											</React.Fragment>
										}
									</div>
									) : ( 
										<div className={"p-3"}>
											<div className="d-flex flex-row border border-dark mb-2 mr-2 ml-2 p-2">
												<div>
													<div className="p-2">
														<button title="Tramo" className={"btn-"+(vCrea===0?"outline-":"")+(fecha_cierre&&fecha&&trayecto&&trimestre?"primary":"dark")+" btn btn-circle btn-xl m-2"} onClick={()=>this.changeState(st=>({vCrea:st.vCrea===0?null:0}))}>
															<i className="fa fa-road"></i>
														</button>
													</div>
												</div>
												<div className="d-flex justify-content-center flex-column">
													<table className="table table-borderless">
														<tbody>
															<tr>
																<td className="text-primary">
																	<h4>Inicio</h4>
																	{fecha===""?"Día / Mes / año":fecha}
																</td>
															</tr>
															<tr>
																<td className="text-primary">
																	<h4>Cierre</h4>
																	{fecha_cierre===""?"Día / Mes / año":fecha_cierre}
																</td>
															</tr>
															<tr>
																<td>
																	<h4>Trayecto</h4>
																	<b className="">{trayecto}</b>
																</td>
																<td>
																	<h4>Trimestre</h4>
																	<b className="">{trimestre}</b>
																</td>
															</tr>
														</tbody>
													</table>
												</div>
											</div>
											
											<div className="d-flex flex-row border border-dark mb-2 mr-2 ml-2 p-2">
												<div>
													<div className="p-2">
														<button title="Sección" className={"btn-"+(vCrea===1?"outline-":"")+(slsecciones==false?"dark":"primary")+" btn btn-circle btn-xl m-2"} onClick={()=>this.changeState(st=>({vCrea:st.vCrea===1?null:1}))}>
															<i className="fa fa-university"></i>
														</button>
													</div>
												</div>
												<div className="d-flex justify-content-center flex-column p-2">
													<h4>Sección</h4>
													<b className="h3 text-primary">{slsecciones.map((e,i)=>e.carrera.nombre)}</b>
													<b>{slsecciones.map((e,i)=>e.nombre)}</b>
												</div>
											</div>
											
											<div className="d-flex flex-row border border-dark mb-2 mr-2 ml-2 p-2">
												<div>
													<div className="p-2">
														<button title="UC's" className={"btn-"+(!slprofeuc.length?"dark":"primary")+" btn btn-circle btn-xl m-2"} onClick={this.profeuc} data-type="addEmpty">
															<i className="fa fa-user-plus"></i>
														</button>
													</div>
												</div>
												<div className="p-2 flex-grow-1">
													<table className="table">
														<thead>
															<tr>
																<th>
																	<h4>Profesor</h4>
																</th>
																<th>
																	<h4>UC</h4>
																</th>
															</tr>
														</thead>
														<tbody>
															{slprofeuc.map((e,i)=>
															  	<tr key={i}>
														  			<td>
														  				{
														  				e.profesor.nombre?
															  				<button className="btn" onClick={()=>this.changeState({indexprofucselect:i, vCrea: vCrea===2?null:2})}>
															  					<div className="mr-1 img-sm" style={{backgroundImage: `url('${loc}/${e.profesor.file_foto}')` }}></div> {e.profesor.nombre} {e.profesor.apellido}
															  				</button>
															  			:
															  				<button className="btn btn-outline-dark btn-circle btn-xl" onClick={()=>this.changeState({indexprofucselect:i, vCrea: vCrea===2?null:2})} >
															  					<i className="fa fa-user-plus"></i>
															  				</button>
														  				}
														  			</td>
														  			<td>
														  			{e.uc.categoria?
															  				<button className="btn" onClick={()=>this.changeState({indexprofucselect:i, vCrea: vCrea===3?null:3})}>
															  					{e.uc.categoria.carrera.nombre} / {e.uc.categoria.nombre} / {e.uc.nombre}
															  				</button>
														  				:
															  				<button className="btn btn-outline-dark btn-circle btn-xl" onClick={()=>this.changeState({indexprofucselect:i, vCrea: vCrea===3?null:3})} >
															  					<i className="fa fa-book"></i>
															  				</button>
														  			}
														  			</td>
																  	
															  		<td>
															  			<button className="btn btn-danger" onClick={this.profeuc} data-index={i} data-type="remove">
															  				<i className="fa fa-times"></i>
															  			</button>
															  		</td>
															  </tr>
															)}
														</tbody>
													</table>

											
												</div>
											</div>
											
											
											<div className="d-flex flex-row border border-dark mb-2 mr-2 ml-2 p-2">
												<div>
													<div className="p-2">
														<button title="Estudiante(s)" disabled={slsecciones.length?false:true} className={"btn-"+(vCrea===4?"outline-":"")+(slestudiantes==false?"dark":"primary")+" btn btn-circle btn-xl m-2"} onClick={()=>this.changeState(st=>({vCrea:st.vCrea===4?null:4}))}>
															<i className="fa fa-graduation-cap"></i>
														</button>
													</div>
												</div>
												<div className="d-flex justify-content-center flex-column p-2">
													<h4>Estudiantes ({slestudiantes.length})</h4>
													<table className="table table-borderless">
														<tbody>
														{	
															slestudiantes.map((estudiante,indexEstudiante)=>
																
																<tr key={indexEstudiante} className="" >
																	<td>
																		<img src={`${loc}/${estudiante.file_foto}`} className={("mr-1 img-sm border ")+(estudiante.verificado?"border-success":(estudiante.inscrito?"border-warning":"border-danger"))} />
																	</td>
																	<td className="hover pointer " data-index={indexEstudiante} data-id={estudiante.id} data-prop="slestudiantes" onClick={this.selectEstudiante}>{estudiante.nombre} {estudiante.apellido}</td>
																	<td className="">{formatCedula(estudiante.cedula)}</td>
																	<td className="">{estudiante.nombrecarrera?estudiante.nombrecarrera.nombre:"Sin carrera"}</td>
																	{
																		estudiante.id_trayecto
																		?
																		<td>
																			<button className="btn">
																				Editando
																			</button>
																			<button className="btn btn-danger" onClick={(event)=>this.postRemoveTrayecto([estudiante.id_trayecto])}>
																				<i className="fa fa-times"></i>
																			</button>
																		</td>
																		:null
																	}
														  	</tr>
															)
														}
														</tbody>
													</table>
												</div>
											</div>
										</div>
									)
								}
							</div>	
						</div>
					</div>
				</div>
			</React.Fragment>

		);
	}
}
render(<App/>,document.getElementById('appreact'));
