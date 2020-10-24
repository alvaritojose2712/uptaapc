import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import {handleNotification,Notification} from './handleNotification.jsx';
import {formatCedula} from '../../assets/custom.js'
import EstudiantesList from './ce.estudiantesList.jsx'

class App extends Component{
	constructor(){
		super()
		let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		let yyyy = today.getFullYear();

		today = yyyy + '-' + mm + '-' + dd;
		this.state = {
			view:0,
			vCrea:null,
			

			id_update:null,

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


			slsecciones:[],
			slpersonal:[],
			sluc:[],
			slestudiantes:[],
			
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)

		this.toggleItem = this.toggleItem.bind(this)


		this.changeState = this.changeState.bind(this)
		this.save = this.save.bind(this)
		this.modoUpdate = this.modoUpdate.bind(this)
		this.selectEstudiante = this.selectEstudiante.bind(this)




	}
	componentDidMount() {
		this.getApiData(null,"/controlEstudios/trayectos","trayectos")

		this.getApiData(null,"/controlEstudios/carreras/uc","uc")
		this.getApiData(null,"/controlEstudios/estudiantes","estudiantes")
		this.getApiData(null,"/rrhh/personal","personal")
		this.getApiData(null,"/controlEstudios/carrera/secciones","secciones")

	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}


	toggleItem(prop,i){
		
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
		const { slestudiantes, estudiantes, id_update } = this.state
		
		const {attributes} = event.currentTarget
		const i = attributes["data-index"].value
		const carrera = attributes["data-carrera"].value
		const id = attributes["data-id"].value


		if(slestudiantes.filter(ee=>ee.id==id).length){
			this.setState(st=>({
				slestudiantes: slestudiantes.filter(ee=>ee.id!=id)
			}));
		}else{
			this.setState(st=>({
				slestudiantes: id_update===null? slestudiantes.concat(estudiantes[carrera][i]) : [estudiantes[carrera][i]]
			}));
		}
	}
	
	save(type=null){
		if (type==="delete") {
			if (confirm("¿Seguro de eliminar?")) {
				axios
				.post("/controlEstudios/trayectos",{
					id_update:this.state.id_update,
					type:"delete",
				})
				.then(data=>{
					handleNotification(data)
					this.getApiData(null,"/controlEstudios/trayectos","trayectos")
					this.setState({
						id_update:null 
					});
				})
				.catch(error=>{
					handleNotification(error)
				})
			}
		}else{

			if (
				this.state.fecha&&
				this.state.trayecto&&
				this.state.trimestre&&
				this.state.slsecciones.length&&
				this.state.slpersonal.length&&
				this.state.sluc.length&&
				this.state.slestudiantes.length
			) {
				axios
				.post("/controlEstudios/trayectos",{
					id_update:this.state.id_update,
					type:this.state.id_update===null?"create":"update",
					
					fecha: this.state.fecha,

					trayecto: this.state.trayecto,
					trimestre: this.state.trimestre,
					slsecciones: this.state.slsecciones[0].id,
					slpersonal: this.state.slpersonal[0].id,
					sluc: this.state.sluc[0].id,
					slestudiantes: this.state.slestudiantes,
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

	modoUpdate(event){
		let id = event.currentTarget.attributes['data-id'].value
		this.setState({
			id_update:id 
		});
		if (this.state.trayectos.sinOrden) {
			let arr = this.state.trayectos.sinOrden.filter(e=>e.id==id)
			if (arr.length) {
				this.setState({
					trayecto:arr[0].trayecto,
					trimestre:arr[0].trimestre,
					fecha:arr[0].fecha,
					slsecciones: [arr[0].seccion],
					slpersonal: [arr[0].profesor],
					sluc: [arr[0].uc],
					slestudiantes: [arr[0].estudiante],

				});
				// console.log([arr[0].estudiante])
			}
			
		}
		
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
			trimestre,
			slsecciones,
			slpersonal,
			sluc,
			slestudiantes,

			searchcarrera,
			searchano,
			searchtrayecto,
			searchtrimestre,
			searchseccion,
			searchuc,
			searchestudiante,

		} = this.state
		return(
			<React.Fragment>
				<Notification />
				<div className="container-fluid">
					<div className="row">
						<div className="col-4">
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
	                              							<span className="tnz-file-tree-label">{seccion[0]}</span>

																							<div className="tnz-file-tree-branches">
																								<div className="form-group-search">
																									<input type="text" value={searchuc} className="searchEstudiante" onChange={e=>this.changeState({searchuc:e.target.value})} placeholder="Buscar..."/>
																								</div>
																								{Object.entries(seccion[1]).map((uc,iuc)=>
																									searchuc===""||uc[0].toString().substr(0,searchuc.length).toLowerCase()===searchuc.toLowerCase()?
																									<label className="tnz-file-tree-item hour" key={iuc}>
																										<input className="tnz-file-tree-cb" type="checkbox"/>
	                              										<span className="tnz-file-tree-label"><i className="fa fa-book"></i> {uc[0]}</span>
																										
																										
																										<div  className="tnz-file-tree-branches">
																											<div className="form-group-search">
																												<input type="text" value={searchestudiante} className="searchEstudiante" onChange={e=>this.changeState({searchestudiante:e.target.value})} placeholder="Buscar..."/>
																											</div>
																											<label htmlFor="">
																												<table className="table table-borderless table-sm">
																													<tbody>
																														{uc[1].map(e=>
																															searchestudiante===""
																															||e.estudiante.cedula.toString().substr(0,searchestudiante.length).toLowerCase()===searchestudiante.toLowerCase()
																															||e.estudiante.nombre.toString().substr(0,searchestudiante.length).toLowerCase()===searchestudiante.toLowerCase()
																															||e.estudiante.apellido.toString().substr(0,searchestudiante.length).toLowerCase()===searchestudiante.toLowerCase()?
																													  	<tr key={e.estudiante.id} onClick={this.modoUpdate} data-id={e.id} className={id_update==e.id?"table-primary":""+" hover"}>
																												  			<td>
																												  				<img src={`${this.loc}/${e.estudiante.file_foto}`} alt="" className="mr-1 img-sm" />
																												  			</td>
																												  			<td className="table-nombre-estudiante">{e.estudiante.nombre} {e.estudiante.apellido}</td>
																												  			<td className="table-cedula-estudiante">{formatCedula(e.estudiante.cedula)}</td>
																													  	</tr>
																													  	:null
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
						<div className="col padding-null rounded">				
							<div className="padding-null col">
								<div className="boton-fixed">
									<button 
										className={(
											fecha&&
											trayecto&&
											trimestre&&
											slsecciones.length&&
											slpersonal.length&&
											sluc.length&&
											slestudiantes.length?"btn-success":"btn-dark")+" btn btn-xl btn-circle m-2"} 
										disabled={(trayecto&&
											fecha&&
											trimestre&&
											slsecciones.length&&
											slpersonal.length&&
											sluc.length&&
											slestudiantes.length)?false:true}
										onClick={this.save}>
											<i className={"fa fa-"+(id_update!==null?"pencil":"send")}></i>
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
									<button className="btn btn-danger mb-3" onClick={()=>this.changeState({id_update:null})}>
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
													    <span className="input-group-text">Día / Mes / Año</span>
													  </div>
													  <input type="date" className="form-control" value={fecha} onChange={e=>this.changeState({fecha:e.target.value})}/>
													</div>
												</div>
												<div className="form-group">
													<h3>Trayecto</h3>
													<select value={trayecto} onChange={e=>this.changeState({"trayecto":e.target.value})} className="form-control">
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
													<select value={trimestre} onChange={e=>this.changeState({"trimestre":e.target.value})} className="form-control">
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
													<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/controlEstudios/carrera/secciones","secciones")} className="form-control"/>
												</div>
												<table className="table table-borderless">
													<tbody>
													{secciones.map((e,i)=>
												  	<tr key={e.id} onClick={()=>this.toggleItem("secciones",i)} className={(slsecciones.filter(ee=>ee.id===e.id).length>0&&"alert-primary")+" hover"}>
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
													<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/rrhh/personal","personal")} className="form-control"/>
												</div>
												<table className="table table-borderless">
													<tbody>
													{personal.map((e,i)=>
														// {e.role==2?
													  	<tr style={{display:e.role==2?"":"none"}} key={e.id} onClick={()=>this.toggleItem("personal",i)} className={(slpersonal.filter(ee=>ee.id===e.id).length>0&&"alert-primary")+" hover"}>
													  			
													  			<td><div className="mr-1 img-sm" style={{backgroundImage: `url('${this.loc}/${e.file_foto}')` }}></div></td>
													  			<td>{e.nombre} {e.apellido}</td>
													  			<td>{e.cedula}</td>
													  			<td>{e.categoria}</td>
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
													<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/controlEstudios/carreras/uc","uc")} className="form-control"/>
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
													{uc.map((e,i)=>
														slsecciones.length?
															slsecciones[0].carrera.nombre===e.categoria.carrera.nombre?
													  	<tr key={e.id} onClick={()=>this.toggleItem("uc",i)} className={(sluc.filter(ee=>ee.id===e.id).length>0&&"alert-primary")+" hover"}>
																	<td>{e.categoria.carrera.nombre} / {e.categoria.nombre} / {e.nombre}</td>
																	<td>{e.u_credito}</td>
																	<td>{e.duracion}</td>
																	<td>{e.trayecto}</td>
													  	</tr>
													  	:null
													  :null
													)}
													</tbody>
												</table>
											</div>
										}
										{vCrea===4&&
											<EstudiantesList selects={slestudiantes.map(e=>e.id)} estudiantes={estudiantes} loc={this.loc} getIdEstudiante={this.selectEstudiante} />
										}
									</div>
									) : ( 
										<div className={(id_update!==null?"border border-danger":"")+" p-3"}>
											<div className="d-flex flex-row border border-dark mb-2 mr-2 ml-2 p-2">
												<div>
													<div className="p-2">
														<button title="Tramo" className={"btn-"+(vCrea===0?"outline-":"")+(fecha&&trayecto&&trimestre?"primary":"dark")+" btn btn-circle btn-xl m-2"} onClick={()=>this.changeState(st=>({vCrea:st.vCrea===0?null:0}))}>
															<i className="fa fa-road"></i>
														</button>
													</div>
												</div>
												<div className="d-flex justify-content-center flex-column">
													<table className="table table-borderless">
														<tbody>
															<tr>
																<td className="text-primary text-right h2">{fecha===""?"Día / Mes / año":fecha}</td>
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
														<button title="Profesor" className={"btn-"+(vCrea===2?"outline-":"")+(slpersonal==false?"dark":"primary")+" btn btn-circle btn-xl m-2"} onClick={()=>this.changeState(st=>({vCrea:st.vCrea===2?null:2}))}>
															<i className="fa fa-user-plus"></i>
														</button>
													</div>
												</div>
												<div className="d-flex justify-content-center flex-column p-2">
													<h4>Profesor</h4>

													<table className="table table-borderless">
														<tbody>
														{slpersonal.map((e,i)=>
														  	<tr key={e.id}>
													  			<td>
													  				<div className="mr-1 img-sm" style={{backgroundImage: `url('${this.loc}/${e.file_foto}')` }}></div>
													  			</td>
													  			<td>{e.nombre} {e.apellido}</td>
													  			<td>{e.cedula}</td>
													  			<td>{e.categoria}</td>
														  	</tr>
														)}
														</tbody>
													</table>
												</div>
											</div>
											
											<div className="d-flex flex-row border border-dark mb-2 mr-2 ml-2 p-2">
												<div>
													<div className="p-2">
														<button title="UC's" className={"btn-"+(vCrea===3?"outline-":"")+(sluc==false?"dark":"primary")+" btn btn-circle btn-xl m-2"} onClick={()=>this.changeState(st=>({vCrea:st.vCrea===3?null:3}))}>
															<i className="fa fa-book"></i>
														</button>
													</div>
												</div>
												<div className="d-flex justify-content-center flex-column p-2">
													<h4>UC</h4>
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
														{sluc.map((e,i)=>
													  	<tr key={e.id}>
																	<td>{e.categoria.carrera.nombre} / {e.categoria.nombre} / {e.nombre}</td>
																	<td>{e.u_credito}</td>
																	<td>{e.duracion}</td>
																	<td>{e.trayecto}</td>
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
													{<EstudiantesList estudiantes={slestudiantes} getIdEstudiante={this.selectEstudiante}/>}
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
