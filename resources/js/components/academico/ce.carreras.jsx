import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


// import Alert from 'react-s-alert';

class App extends Component{
	constructor(){
		super()
		this.state = {
			carreras:[],
			uc:[],
			carreras_id:null,
			categoria_id:null,
			uc_id:null,

			nombreCarrera:"",
			nombreCategoria:"",

			nombreUc:"",
			u_credito:"",
			duracion:"",
			trayecto:"I",

			ucSelectPrela:0,

			nombreSeccion:"",

			section:null,//0 Unidades Curricular 1 Secciones
		}
		this.getApiData = this.getApiData.bind(this)
		this.delItem = this.delItem.bind(this)
		this.addItem = this.addItem.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)

	}
	componentDidMount() {
		this.getApiData(null,"/controlEstudios/carreras","carreras")
		this.getApiData(null,"/controlEstudios/carreras/uc","uc")

		
	}

	getApiData(e,url,prop,paramsCustom=null){
		axios.get(url,{params:paramsCustom!==null?paramsCustom:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}
	updItem(id,type){
		let val = prompt("Nombre")
		if (val!==null&&val!=="") {
			
			let url,obj;
					obj = {id:id,nombre:val}
			switch(type){
				case "carrera":
					url = "/controlEstudios/carrera"
				break;

				case "categoria":
					url = "/controlEstudios/carrera/categorias"
				break;

				case "uc":
					url = "/controlEstudios/carrera/uc"
				break;

				case "seccion":
					url = "/controlEstudios/carrera/seccion"
				break;

			}
			axios
			.put(url,obj)
			.then(data=>{
				console.log(data)
				this.getApiData(null,"/controlEstudios/carreras","carreras")
			})
			.catch(error=>console.log(error))
		}
	}
	delItem(id,type){
		if (confirm("¿Realmente quiere eliminar?")) {
			
			let url,obj;
			switch(type){
				case "carrera":
					url = "/controlEstudios/carrera"
					obj = {params:{id:id}}
				break;

				case "categoria":
					url = "/controlEstudios/carrera/categorias"
					obj = {params:{id:id}}
				break;

				case "uc":
					url = "/controlEstudios/carrera/uc"
					obj = {params:{id:id}}
				break;

				case "seccion":
					url = "/controlEstudios/carrera/seccion"
					obj = {params:{id:id}}
				break;

				case "prela":
					url = "/controlEstudios/carrera/prela"
					obj = {params:{id:id}}
				break;
			}
			axios
			.delete(url,obj)
			.then(data=>{
				console.log(data)
				this.getApiData(null,"/controlEstudios/carreras","carreras")
			})
			.catch(error=>console.log(error))
		}
	}
	addItem(type){
		let url,obj;
		switch(type){
			case "carrera":
				url = "/controlEstudios/carrera"
				obj = {nombreCarrera:this.state.nombreCarrera}
			break;

			case "categoria":
				url = "/controlEstudios/carrera/categorias"
				obj = {nombre:this.state.nombreCategoria,id_carrera:this.state.carreras[this.state.carreras_id].id}
			break;

			case "uc":
				url = "/controlEstudios/carrera/uc"
				obj = {
					nombre:this.state.nombreUc,

					u_credito:this.state.u_credito,
					duracion:this.state.duracion,
					trayecto:this.state.trayecto,
					id_categoria:this.state.carreras[this.state.carreras_id].categorias[this.state.categoria_id].id
				}
			break;

			case "seccion":
				url = "/controlEstudios/carrera/seccion"
				obj = {
					nombre:this.state.nombreSeccion,
					id_carrera:this.state.carreras[this.state.carreras_id].id
				}
			break;

			case "prela":
				url = "/controlEstudios/carrera/prela"
				obj = {
					id_uc:this.state.carreras[this.state.carreras_id].categorias[this.state.categoria_id].ucs[this.state.uc_id].id,
					prela:this.state.ucSelectPrela
				}
			break;

			prela

		}
		axios
		.post(url,obj)
		.then(data=>{
			console.log(data)
			this.getApiData(null,"/controlEstudios/carreras","carreras")
		})
		.catch(error=>console.log(error))
	}
	
	changeUniqueState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	
	render(){
		let { 
		carreras,
		uc,
		carreras_id,
		categoria_id,
		uc_id,
		nombreCarrera,
		nombreCategoria,
		nombreUc,
		u_credito,
		duracion,
		trayecto,
		ucSelectPrela,
		nombreSeccion,
		section } = this.state
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-2">
						<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/controlEstudios/carreras","carreras")} className="form-control mb-3"/>
						<div className="input-group">
						  <input type="text" className="form-control" placeholder="Agregar carrera..." value={nombreCarrera} onChange={e=>this.changeUniqueState({nombreCarrera:e.target.value})}/>
						  <div className="input-group-append">
						    <button onClick={()=>this.addItem("carrera")} className="btn btn-outline-success" type="button"><i className="fa fa-plus"></i></button>
						  </div>
						</div>
						<table className="table">
							<tbody>
								{carreras.map((e,i)=>
										<tr key={i} className={(carreras_id===i?"alert-success":"")+" hover"} onClick={()=>this.changeUniqueState({categoria_id:null}).then(()=>this.changeUniqueState({carreras_id:i}))}>
											<td>{e.nombre}</td>
											<td>
												<div className="btn-group w-100">
													<button className="btn btn-sm"><i className="fa fa-pencil" onClick={()=>this.updItem(e.id,"carrera")}></i></button>
													<button className="btn btn-sm"><i className="fa fa-trash" onClick={()=>this.delItem(e.id,"carrera")}></i></button>
												</div>
											</td>
										</tr>
								)}
							</tbody>
						</table>
					</div>
					{(carreras[carreras_id]&&carreras_id!==null)&&<div className="col">
						<div className="card">
							<div className="card-header">
				    <span className="h2" aria-current="page">{carreras[carreras_id].nombre}</span>
				    
				    <span className="text-success h3" aria-current="page">{section===1?" / Secciones":null}{section===0?" / Unidades Curriculares":null}</span>
							</div>
							<div className="card-body">
								<div className="container-fluid">
									<div className="row">
										<div className="col-md-auto d-flex justify-content-center flex-column">
											<h1><button tittle="Unidades Curriculares" onClick={()=>this.changeUniqueState({section:0})} className={(section===0?"btn-success":"btn-primary")+" btn btn-xl btn-circle"}>
												<i className="fa fa-book"></i>
											</button></h1>
											<h1><button tittle="Secciones" onClick={()=>this.changeUniqueState({section:1})} className={(section===1?"btn-success":"btn-primary")+" btn btn-xl btn-circle"}>
												<i className="fa fa-university"></i>
											</button></h1>
										</div>
										<div className="col justify-content-center d-flex">
											{section===0?<React.Fragment>
												<div className="m-3 rounded border border-dark w-25 p-2">
													<h4>Categorías</h4>
													<div className="input-group mb-3">
													  <input type="text" className="form-control" placeholder="Agregar categoría..." value={nombreCategoria} onChange={e=>this.changeUniqueState({nombreCategoria:e.target.value})}/>
													  <div className="input-group-append">
													    <button onClick={()=>this.addItem("categoria")} className="btn btn-outline-success" type="button"><i className="fa fa-plus"></i></button>
													  </div>
													</div>

													<table className="table table-borderless">
														<tbody>
															{carreras[carreras_id].categorias.map((e,i)=>
																<tr onClick={()=>this.changeUniqueState({categoria_id:i,ucSelectPrela:"null"})} key={i} className={(categoria_id===i?"alert-success":"")+" hover"}>
																	<td>
																		<span>{e.nombre}</span>
																	</td>
																	<td>
																		<div className="btn-group w-100">
																			<button className="btn btn-sm"><i className="fa fa-pencil" onClick={()=>this.updItem(e.id,"categoria")}></i></button>
																			<button className="btn btn-sm"><i className="fa fa-trash" onClick={()=>this.delItem(e.id,"categoria")}></i></button>
																		</div>
																		
																	</td>
																	
																</tr>
															)}
														</tbody>
													</table>
												</div>
												{(carreras[carreras_id].categorias[categoria_id]&&categoria_id!==null)?
													<div className="m-3 rounded border border-dark p-2">
														<div className="container-fluid">
															<div className="row">
																<div className="col">
																	<h4>UC's</h4>
																	<div className="input-group mb-3">
																	 	<input type="text" className="form-control" placeholder="Unidad Curricular..." value={nombreUc} onChange={e=>this.changeUniqueState({nombreUc:e.target.value})}/>
																		<input type="number" className="form-control" placeholder="Unidades Crédito..." value={u_credito} onChange={e=>this.changeUniqueState({u_credito:e.target.value})}/>
																		<input type="number" className="form-control" placeholder="Duración.. Semanas" value={duracion} onChange={e=>this.changeUniqueState({duracion:e.target.value})}/>
																		<select className="form-control" value={trayecto} onChange={e=>this.changeUniqueState({trayecto:e.target.value})}>
																			<option value="I">I</option>
																			<option value="II">II</option>
																			<option value="III">III</option>
																			<option value="IV">IV</option>
																			<option value="V">V</option>
																			<option value="VI">VI</option>
																		</select>
																	  <div className="input-group-append">
																	    <button onClick={()=>this.addItem("uc")} className="btn btn-outline-success" type="button"><i className="fa fa-plus"></i></button>
																	  </div>
																	</div>

																	<table className="table table-borderless">
																		<tbody>
																			{carreras[carreras_id].categorias[categoria_id].ucs.map((e,i)=>
																				<tr key={i} className={(uc_id===i?"alert-success":"")+" hover"} onClick={()=>this.changeUniqueState({uc_id:i,ucSelectPrela:"null"})}>
																					<td>
																						{e.nombre}
																					</td>
																					<td>{e.u_credito}</td>
																					<td>{e.duracion}</td>
																					<td>{e.trayecto}</td>
																					<td>
																						<i className="fa fa-trash" onClick={()=>this.delItem(e.id,"uc")}></i>
																					</td>
																				</tr>
																			)}
																		</tbody>
																	</table>
																</div>
																{(uc_id!==null&&carreras[carreras_id].categorias[categoria_id].ucs[uc_id])?
																	<div className="col">
																		<h4>Prelaciones  <span className="text-success"> / {carreras[carreras_id].categorias[categoria_id].ucs[uc_id].nombre}</span></h4>
																		<div className="input-group mb-3">
																			<input type="text" className="form-control" placeholder="Buscar.." onChange={e=>this.getApiData(e,"/controlEstudios/carreras/uc","uc")}/>
																			<select className="form-control" value={ucSelectPrela} onChange={e=>this.changeUniqueState({ucSelectPrela:e.target.value})}>
																				<option value="null">--Seleccione--</option>
																				{uc.filter(e=>carreras[carreras_id].categorias.map(e=>e.id).indexOf(e.id_categoria)!==-1).map((e,i)=>
																					<option value={e.id} key={i}>{e.nombre} / Tray. {e.trayecto}</option>
																				)}
																			</select>
																		  <div className="input-group-append">
																		    <button onClick={()=>this.addItem("prela")} disabled={(ucSelectPrela!=="null"&&uc.filter(e=>carreras[carreras_id].categorias.map(e=>e.id).indexOf(e.id_categoria)!==-1).length)?false:true} className="btn btn-outline-success" type="button"><i className="fa fa-plus"></i></button>
																		  </div>
																		</div>
																		<ul className="list-group">
																			{carreras[carreras_id].categorias[categoria_id].ucs[uc_id].prela.map((e,i)=>
																				<li key={i} className="list-items-group d-flex justify-content-between">
																					<span>{e.uc.nombre} / Tray. {e.uc.trayecto}</span>
																					<i className="fa fa-trash hover" onClick={()=>this.delItem(e.id,"prela")}></i>
																				</li>
																			)}
																		</ul>
																	</div>
																:null}
															</div>
														</div>
													</div>
												:null}
												
											</React.Fragment>:null}
											{section===1?<React.Fragment>
												<div className="m-3 rounded border border-dark w-25 p-2">
														
													<div className="input-group mb-3">

													  <input type="text" className="form-control" placeholder="Agregar Sección..." value={nombreSeccion} onChange={e=>this.changeUniqueState({nombreSeccion:e.target.value})}/>
													  <div className="input-group-append">
													    <button onClick={()=>this.addItem("seccion")} className="btn btn-outline-success" type="button"><i className="fa fa-plus"></i></button>
													  </div>
													</div>

													<table className="table table-borderless">
														<tbody>
															{carreras[carreras_id].secciones.map((e,i)=>
																<tr key={i}>
																<td>
																	<span>{e.nombre}</span>
																</td>
																<td>
																		<div className="btn-group w-100">
																			<button className="btn btn-sm"><i className="fa fa-pencil" onClick={()=>this.updItem(e.id,"seccion")}></i></button>
																			<button className="btn btn-sm"><i className="fa fa-trash" onClick={()=>this.delItem(e.id,"seccion")}></i></button>
																		</div>
																	
																</td>
																</tr>
															)}
														</tbody>
													</table>
												</div>
											</React.Fragment>:null}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>}
					
				</div>
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));