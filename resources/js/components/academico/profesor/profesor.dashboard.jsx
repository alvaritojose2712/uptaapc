import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {HeaderPersona} from '../headerPersona';
import {formatCedula,searchParams} from '../../../assets/custom';
import Cargando from '../../../assets/cargando';
import {handleNotification,Notification} from '../handleNotification.jsx';
import cloneDeep from 'lodash/cloneDeep';





const loc = window.location.origin

function NuevaTareaComponent({onChange,state,submitTarea,changeState}) {
	let {
		nombre,
		modo,
		fecha_entrega,
		modoQueryTarea,

		profesorAcademico,
		id_ano,
		id_trayecto,
		id_trimestre,
		id_seccion,
		id_materia,
		id_trayecto_select,
	} = state

	let estudiantes = [];
	try{
		estudiantes = profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion][id_materia]
		if (id_trayecto_select) {
			estudiantes = estudiantes.filter(e=>e.id==id_trayecto_select)
		}
		return (
			<React.Fragment>
  			<table className="table">
  				<tbody>
  					<tr>
  						<td className="h3">
  							Asignar nueva tarea para:
  						</td>
  					</tr>
  					{estudiantes.length&&id_trayecto_select?
	  					<tr key={estudiantes[0].estudiante.id}>
								<td><div className="img-sm" style={{backgroundImage:"url('"+loc+"/"+estudiantes[0].estudiante.file_foto+"')"}}></div></td>
								<td>{estudiantes[0].estudiante.nombre} {estudiantes[0].estudiante.apellido}</td>
								<td><span className={"badge badge-"+(estudiantes[0].estudiante.genero==="Masculino"?"primary":"warning")}>{estudiantes[0].estudiante.genero}</span></td>
								<td>{formatCedula(estudiantes[0].estudiante.cedula)}</td>
		    			</tr>	
  					:
  					<tr>
  						<td className="h3"><span className="text-primary">{id_seccion}</span> / <span className="text-primary">{id_materia}</span></td>
  					</tr>
  					}
  				</tbody>
  			</table>
				<form onSubmit={submitTarea}>

				  <div className="form-group">
				    <label>Nombre</label>
				    <input type="text" className="form-control" name="nombre" onChange={onChange} value={nombre} placeholder="Especifique el título de la actividad" required/>
				    <small className="form-text text-muted"></small>
				  </div>
				  <div className="form-group">
				    <label>Descripción</label>
				    <textarea name="modo" className="form-control" value={modo} placeholder="Descripción de la actividad" onChange={onChange} required></textarea>
				  </div>
				  <div className="form-group">
				    <label>Fecha</label>
				    <input type="date" className="form-control" name="fecha_entrega" onChange={onChange} value={fecha_entrega} placeholder="Especifique el título de la actividad" required/>
				    <small className="form-text text-muted">Fecha límite de entrega</small>
				  </div>
				  <button type="submit" className="btn btn-primary">{modoQueryTarea=="create"?"Registrar":"Modificar"}</button>
				</form>	
			</React.Fragment>
		)
   }catch(err){}

}

function NotasComponent({state,changeState}){
  	let {
  		profesorAcademico,
  		id_ano,
  		id_trayecto,
  		id_trimestre,
  		id_seccion,
  		id_materia,

  		id_trayecto_select,
  	} = state
  	let ids = {};
  	let estudiantes = [];
  	try{
  		estudiantes = profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion][id_materia]
  		if (id_trayecto_select) {
  			estudiantes = estudiantes.filter(e=>e.id==id_trayecto_select)
  		}
  		let notas_unificadas = [{notas:[]}]

	  	if (!id_trayecto_select) {
	  		estudiantes.map(estudiante=>{
	  			estudiante.notas.map(nota=>{
	  				if (!notas_unificadas[0].notas.filter(e=>
	  					e.nombre==nota.nombre&&
	  					e.fecha_entrega==nota.fecha_entrega&&
	  					e.modo==nota.modo&&
	  					e.uniqid==nota.uniqid
	  				).length) {
	  					notas_unificadas[0].notas.push(nota)
	  				}

	  			})
	  		})
	  	}
	  	return (
	  		<React.Fragment>
		  		<div className="text-right mb-1 mt-1">
						<button className="btn btn-outline-primary" onClick={id_materia?()=>changeState({cargarNotas:true }):null}>Carga notas</button>
					</div>
	  			<table className="table">
	  				<tbody>
	  					{estudiantes.length&&id_trayecto_select?
		  					<tr key={estudiantes[0].estudiante.id}>
									<td><div className="img-sm" style={{backgroundImage:"url('"+loc+"/"+estudiantes[0].estudiante.file_foto+"')"}}></div></td>
									<td>{estudiantes[0].estudiante.nombre} {estudiantes[0].estudiante.apellido}</td>
									<td><span className={"badge badge-"+(estudiantes[0].estudiante.genero==="Masculino"?"primary":"warning")}>{estudiantes[0].estudiante.genero}</span></td>
									<td>{formatCedula(estudiantes[0].estudiante.cedula)}</td>
			    			</tr>	
	  					:
	  					<tr>
	  						<td className="h3"><span className="text-primary">{id_seccion}</span> / <span className="text-primary">{id_materia}</span></td>
	  					</tr>
	  					}
	  				</tbody>
	  			</table>
					<div className="list-group">
						{(id_trayecto_select?estudiantes:notas_unificadas).map(estudiante=>
							estudiante.notas.map(e=>
							  <a href="#" key={e.id} className={(e.completado&&id_trayecto_select?"list-group-item-success":"")+(" list-group-item list-group-item-action")}>
							    {id_trayecto_select?
							    	<div className="text-right">
							    		<h2><span className="badge badge-primary">{e.puntos}</span></h2>
							    	</div>
							    :null}
							    <div className="d-flex w-100 justify-content-between">
							      <h5 className="mb-1">{e.nombre}</h5>
							      <small>{e.fecha_entrega}</small>
							    </div>
							    <p className="mb-1">{e.modo}</p>
						      <small className="text-muted">{e.created_at}</small>
							  </a>
							)
						)}
					</div>
	  		</React.Fragment>
	  	)
  	}catch(err){
  		console.log(err)
  		return <div className="text-muted text-center">¡Nada que mostrar!</div>
  	}
}

function CargarNotasComponent({updateMode, state, selectFile, saveNota, changeState}){
	try{
		let {
  		profesorAcademico,
  		id_ano,
  		id_trayecto,
  		id_trimestre,
  		id_seccion,
  		id_materia,

  		id_trayecto_select,
  		cargarNotas,

  		q
  	} = state

  	let estudiantes = profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion][id_materia]

  	if (id_trayecto_select) {
			estudiantes = estudiantes.filter(e=>e.id==id_trayecto_select)
		}
		return (
			<React.Fragment>
				<div className="text-right mb-1 mt-1">
					<button className="btn btn-outline-danger" onClick={id_materia?()=>changeState({cargarNotas:!cargarNotas}):null}>Cancelar carga <i className={"fa-times fa"}></i></button>
				</div>
				<table className="table">
					<thead>
						<tr>
							<th colSpan="3"></th>
							<th>
								<div className="input-group mb-3" title="TXT separado por tabulaciones:
								| Primera columna -> Cédula del estudiante 
								| Segunda columna -> Nota del estudiante 
								| Tercera columna -> Modo de calificación 
								| Una fila por estudiante">
								  <div className="input-group-prepend">
								    <span className="input-group-text">Notas por lotes</span>
								  </div>
								  <div className="custom-file">
								    <input type="file" className="custom-file-input" accept=".txt" onChange={selectFile}/>
								    <label className="custom-file-label">Seleccionar .txt</label>
								  </div>
								  
								</div>
							</th>
						</tr>
						<tr>
							<th></th>
							<th>Nombres y Apellidos</th>
							<th>Cédula</th>
							<th>Ponderación</th>
							<th>
							{estudiantes.map(e=>e.notas).filter(e=>!(e==false)).length?
									<button className="btn btn-primary" onClick={saveNota}><i className="fa fa-send"></i></button>
								:null}
							</th>
						</tr>
					</thead>
					<tbody>

						{estudiantes.map((e,i)=>
							e.inscripcion?
							  <tr key={e.estudiante.id}>
									<td><div className="img-sm" style={{backgroundImage:"url('"+loc+"/"+e.estudiante.file_foto+"')"}}></div></td>
									<td>{e.estudiante.nombre} {e.estudiante.apellido}</td>
									<td>{formatCedula(e.estudiante.cedula)}</td>
									<td>
										{e.editable?
											<ul className="list-group">

												
												{e.notas.map((nota,inota)=>
													<React.Fragment key={inota}>

														<li key={inota} className={"list-group-item list-group-item-action d-flex "+(nota.type==="delete"&&"opacity-md")}>
															<div className="flex-grow-1">
																<div className="mb-1">
													    		<span className="text-muted">¿Evaluada?</span>
																	<input type="checkbox" disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" checked={nota.completado} onChange={event=>updateMode(event.target.checked,inota,i,"changeInputcompletado")}/>
																</div>
												   		
													    	<div className="mb-1">
													    		<span className="text-muted">Puntuación</span>
																	<input type="number" disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" min="0" max="99" value={nota.puntos} onChange={event=>updateMode(event.target.value,inota,i,"changeInput")} placeholder="Pts"/>
													    	</div>
														    
														    <div className="d-flex w-100 justify-content-between mb-1">
														      <small>
														    		<span className="text-muted">Título de la actividad</span>
																		<input type="text" disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" value={nota.nombre} onChange={event=>updateMode(event.target.value,inota,i,"changeInputnombre")} placeholder="Nombre"/>

														      </small>
														      <small>
														    		<span className="text-muted">Fecha límite de entrega</span>
																		<input type="date" disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" value={nota.fecha_entrega} onChange={event=>updateMode(event.target.value,inota,i,"changeInputfecha_entrega")}/>
														      </small>
														    </div>
														    <p className="mb-1">
														    	<span className="text-muted">Más detalles</span>
														      <textarea disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" value={nota.modo} onChange={event=>updateMode(event.target.value,inota,i,"changeInputModo")} placeholder="Descripción"></textarea>

														    </p>
													      <small className="text-muted">*Se creará con la fecha de hoy*</small>
															</div>
															<div className="d-flex align-items-center p-2">
																<div className="btn-group-vertical">
																	{!nota.type?
																		<React.Fragment>
																				<button className="btn btn-warning" onClick={()=>updateMode(null,inota,i,"update")}><i className="fa fa-pencil"></i></button>
																				<button className="btn btn-danger" onClick={()=>updateMode(null,inota,i,"delMode")}><i className="fa fa-trash"></i></button>
																		</React.Fragment>
																		:null}
																	{nota.type==="new"?
																		<button className="btn btn-danger" onClick={()=>updateMode(null,inota,i,"delNew")}><i className="fa fa-times"></i></button>
																		:null}
																	{nota.type==="update"?
																		<button className="btn btn-warning" onClick={()=>updateMode(null,inota,i,"delModeUpdateDelete")}><i className="fa fa-times"></i></button>
																	:null}
																	{nota.type==="delete"?
																		<button className="btn btn-danger" onClick={()=>updateMode(null,inota,i,"delModeUpdateDelete")}><i className="fa fa-arrow-left"></i></button>
																	:null}
															  </div>
															</div>
													  </li>


													</React.Fragment>
												)}
											
											</ul>
										:<ul className="list-group">
											{e.notas.map((ee,ii)=>
												<li key={ii} className="list-group-item">{ee.puntos} / {ee.modo}</li>
											)}
										</ul>}
									</td>
									<td>
										<button className="btn btn-success" onClick={()=>updateMode(null,null,i,"addNew",e.id)}><i className="fa fa-plus"></i></button>
									</td>
								</tr>
							:<tr key={e.estudiante.id}>
								<td colSpan="5">
									<span className="text-muted text-center">{e.estudiante.nombre} {e.estudiante.apellido} {formatCedula(e.estudiante.cedula)} | No ha inscrito la materia</span>
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</React.Fragment>
		)
	}catch(err){
		return "";
	}
}


class App extends Component{
	constructor(){
		super()
		this.state = {
			activeLoading:false,

			profesorAcademico:{},
			profesor:{},
			viewE:1,

			q:"",

			nuevaTarea:false,

			id_ano: null,
			id_trayecto: null,
			id_trimestre: null,
			id_seccion: null,
			id_materia: null,

			secciones_num: 0,
			materias_num: 0,
			estudiantes_num: 0,


			modo: "",
			nombre: "",
			fecha_entrega: "",
			puntos: "0",
			completado: "0",

			modoQueryTarea:"create",
			

			id_trayecto_select:null,

			cargarNotas:false,




		}
		this.getApiData = this.getApiData.bind(this)

		this.changeState = this.changeState.bind(this)
		this.search = this.search.bind(this)
		this.onChange = this.onChange.bind(this)
		this.submitTarea = this.submitTarea.bind(this)

		this.selectFile = this.selectFile.bind(this)
		this.updateMode = this.updateMode.bind(this)

		



	}
	componentDidMount() {
		this.search()

		this.getApiData(null,"/profesor/show","profesor")

	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop,params=null){
		axios.get(url,{params:params?params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}
	search(){
		axios.get("/profesor/academico",{params:{fecha:true}})
		.then(data=>{
			this.setState({
				profesorAcademico:data.data.academico,
				secciones_num: data.data.secciones_num,
				materias_num: data.data.materias_num,
				estudiantes_num: data.data.estudiantes_num,
			})
		})
		.catch(err=>{console.log(err)})
	}
	onChange(event){
    let e = event.currentTarget
    let name = e.attributes.name.value
    let value = e.value
    this.setState({[name]: value });
  };

  submitTarea(event){
  	event.preventDefault()

  	let {
  		profesorAcademico,
  		id_ano,
  		id_trayecto,
  		id_trimestre,
  		id_seccion,
  		id_materia,
  		id_trayecto_select,

  		cargarNotas,

  		modo,
			puntos,
			nombre,
			fecha_entrega,
			completado,

			modoQueryTarea,


  	} = this.state
  	let ids = [];
  	let estudiantes = [];
  	try{
  		estudiantes = profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion][id_materia]
	  	if (estudiantes) {
	  		ids = estudiantes.map(e=>e.id)
	  	}
  	}catch(err){}
  	
		axios
		.post("/profesor/tareas",{

	  	modo: modo,
			puntos: puntos,
			nombre: nombre,
			fecha_entrega: fecha_entrega,
			completado: completado,

			ids: id_trayecto_select?[id_trayecto_select]:ids,

			modoQueryTarea: cargarNotas?"update":modoQueryTarea,

			notas: estudiantes.map(e=>e.notas).filter(e=>!(e==false))
			
		})
		.then((data)=>{
			this.setState({activeLoading:false});
      handleNotification(data)
      this.search()
		})
		.catch(error=>{handleNotification(error)})
  }


	selectFile(e,text=null){
		let {
			id_materia,
			id_seccion,
			id_trayecto,
			id_trimestre,
			profesorAcademico
		} = this.state

		let newPro = profesor
		const callback = contenido => {
			if (contenido.length) {
				newPro[id_ano][id_trayecto][id_trimestre][id_seccion][id_materia].map((e,i)=>{
					let newNotas = contenido.filter(ee=>ee[0]==e.estudiante.cedula)
					if (!e.notas.length) {
						this.updateMode(null,null,i,"addNew",e.id)
					}
					e.notas.map((nota,inota)=>{
						if (newNotas[inota]) {
							nota.puntos = newNotas[inota][1]
							nota.modo = newNotas[inota][2]
						}
						return nota
					})
					
					return e
				})
				this.setState({
					profesorAcademico:newPro 
				});
			}
		};

	  let archivo = e.target.files[0];
	  if (!archivo) {
	    return;
	  }
	  let lector = new FileReader();
	  lector.onload = e => {
			callback(e.target.result.split("\n").filter(e=>e).map(e=>e.split("\t")).filter(e=>e.length===3).map(e=>{
				e[0] = parseInt(e[0])
				e[1] = parseFloat(e[1])
				e[2] = e[2].toString()
				return e
			}))

	  };
	  lector.readAsText(archivo,"ISO-8859-1");
	  e.target.value = ""
	}

	updateMode(val,i,id,type,id_trayecto=null){
			
		this.setState(pr=>{
			let profesorAcademico = cloneDeep(pr.profesorAcademico)
			
			switch(type){
				case "update":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].type = "update" 
				break;
				case "delModeUpdateDelete":
					delete profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].type 
				break;
				case "delNew":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas = profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas.filter((e,ii)=>ii!==i)
				break;
				case "addNew":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas = profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas.concat({id_trayecto:id_trayecto,modo:"",puntos:0,type:"new"})
				break;
				case "changeInput":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].puntos = val==""?"":(parseFloat(val)>100?100:parseFloat(val))
				break;
				case "changeInputModo":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].modo = val.substr(0,25)
				break;
				case "changeInputnombre":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].nombre = val
				break;
				case "changeInputfecha_entrega":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].fecha_entrega = val
				break;
				case "changeInputcompletado":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].completado = val
				break;
				case "delMode":
					profesorAcademico[pr.id_ano][pr.id_trayecto][pr.id_trimestre][pr.id_seccion][pr.id_materia][id].notas[i].type = "delete" 
				break;
			}


			return {profesorAcademico}
		});
	}

	
	
	render(){
		let {
			activeLoading,
			q,

			profesor,
			profesorAcademico,
			id_ano,
			id_trayecto,
			id_trimestre,
			id_seccion,
			id_materia,

			secciones_num,
			materias_num,
			estudiantes_num,

			nuevaTarea,

			modo,
			puntos,
			nombre,
			fecha_entrega,
			completado,

			modoQueryTarea,
		

			id_trayecto_select,

			cargarNotas,
		} = this.state
		return(
			<div className="container-fluid">
				<Notification/>
				<div className="row">
					<div className="col">
						<HeaderPersona persona={profesor}/>
					</div>	
				</div>
				<div className="row">
					<div className="col">
						<div className="card rounded border border-dark p-3">
						<Cargando active={activeLoading}/>
							<div className="container-fluid">
								<div className="row">
									<div className="">
											<h3>
												<span className="mr-2">Secciones <span className="badge badge-success">{secciones_num}</span></span>
												<span className="mr-2">Materias <span className="badge badge-primary">{materias_num}</span></span>
												<span className="mr-2">Estudiantes <span className="badge badge-warning">{estudiantes_num}</span></span>
											</h3>
											<nav aria-label="breadcrumb">
											  <ol className="breadcrumb">
											    {id_ano && <li className="breadcrumb-item" onClick={()=>this.changeState({id_trayecto:null,id_trimestre:null,id_seccion:null,id_materia:null,id_trayecto_select:null})}><a href="#">{id_ano}</a></li>}

											    {id_trayecto && <li className="breadcrumb-item" onClick={()=>this.changeState({id_trimestre:null,id_seccion:null,id_materia:null,id_trayecto_select:null})}><a href="#">{id_trayecto}</a></li>}

											    {id_trimestre && <li className="breadcrumb-item" onClick={()=>this.changeState({id_seccion:null,id_materia:null,id_trayecto_select:null})}><a href="#">{id_trimestre}</a></li>}

											    {id_seccion && <li className="breadcrumb-item" onClick={()=>this.changeState({id_materia:null,id_trayecto_select:null})}><a href="#">{id_seccion}</a></li>}

											    {id_materia && <li className="breadcrumb-item active" aria-current="page">{id_materia}</li>}
											  </ol>
											</nav>
									</div>
								</div>	
								<div className="row">
									<div className="col-4">
										<div className="p-3">
											<h1>Mis cursos</h1>
											<ul className="list-group">
												{
										    id_materia ? <li className="list-group-item list-group-item-action list-group-item-secondary hover" title="Ver todos los estudiantes" onClick={()=>this.changeState({id_trayecto_select:null})}>Estudiantes</li> :
										    id_seccion ? <li className="list-group-item list-group-item-action list-group-item-secondary">Materias</li> :
										    id_trimestre ? <li className="list-group-item list-group-item-action list-group-item-secondary">Secciones</li> :
										    id_trayecto ? <li className="list-group-item list-group-item-action list-group-item-secondary">Trimestres</li> :
												id_ano ? <li className="list-group-item list-group-item-action list-group-item-secondary">Trayectos</li> :
												!id_ano ? <li className="list-group-item list-group-item-action list-group-item-secondary">Año</li> :
										    null}
												
												{profesorAcademico?

													<React.Fragment>
														
														{id_ano?
															<React.Fragment>
																
																{id_trayecto?
																	<React.Fragment>
																		
																		{id_trimestre?
																			<React.Fragment>
																				
																				{id_seccion?
																					<React.Fragment>
																						
																						{id_materia?
																							<table className="table table-sm">
																								<tbody>
																									<tr>
																										<td colSpan="5">
																											<input type="text" className="form-control" placeholder="Buscar..." value={q} onChange={this.onChange} name="q"/>
																										</td>
																									</tr>
																								{profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion][id_materia].map(e=>
																									searchParams(q,e.estudiante,["nombre","apellido","cedula"])?

																					    			<tr className={id_trayecto_select==e.id?"table-primary":""+(" hover")} key={e.estudiante.id} onClick={()=>this.changeState({id_trayecto_select:e.id})}>
																											<td>{e.estudiante.id}</td>
																											<td><div className="img-sm" style={{backgroundImage:"url('"+loc+"/"+e.estudiante.file_foto+"')"}}></div></td>
																											<td>{e.estudiante.nombre} {e.estudiante.apellido}</td>
																											<td><span className={"badge badge-"+(e.estudiante.genero==="Masculino"?"primary":"warning")}>{e.estudiante.genero}</span></td>
																											<td>{formatCedula(e.estudiante.cedula)}</td>
																					    			</tr>	
																				    			:null
																				    		)}
																							</tbody>
																							</table>
																						:Object.keys(profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion]).map(materia=>
																		    			<li className="list-group-item hover pointer" key={materia} onClick={()=>this.changeState({id_materia:materia})}>
																			    			{materia} <span className="badge badge-secondary">{profesorAcademico[id_ano][id_trayecto][id_trimestre][id_seccion][materia].length}</span>
																		    			</li>
																		    		)}
																	    		</React.Fragment>
																				:Object.keys(profesorAcademico[id_ano][id_trayecto][id_trimestre]).map(seccion=>
																    			<li className="list-group-item hover pointer" key={seccion} onClick={()=>this.changeState({id_seccion:seccion})}>{seccion}</li>
																    		)}
															    		</React.Fragment>
																		:Object.keys(profesorAcademico[id_ano][id_trayecto]).map(trimestre=>
														    			<li className="list-group-item hover pointer" key={trimestre} onClick={()=>this.changeState({id_trimestre:trimestre})}>{trimestre}</li>
														    		)}
													    		</React.Fragment>
																:Object.keys(profesorAcademico[id_ano]).map(trayecto=>
													    		<li className="list-group-item hover pointer" key={trayecto} onClick={()=>this.changeState({id_trayecto:trayecto})}>{trayecto}</li>
													    	)}
												    	</React.Fragment>
															
														:Object.keys(profesorAcademico).map(ano=>
											    		<li className="list-group-item hover pointer" key={ano} onClick={()=>this.changeState({id_ano:ano})}>{ano}</li>
														)}
													</React.Fragment>
												:null}
										  </ul>
										</div>
									</div>
									<div className="col">
										<div className="p-3">
											<h1>Tareas asignadas <button className="btn btn-outline-success" onClick={id_materia?()=>this.changeState({nuevaTarea:!nuevaTarea,cargarNotas:false}):null}><i className={(!nuevaTarea?"fa-plus":"fa-eye")+(" fa")}></i></button></h1>

											{
												nuevaTarea && <NuevaTareaComponent state={{...this.state}} onChange={this.onChange} submitTarea={this.submitTarea} changeState={this.changeState}/>
											}
											{(!nuevaTarea && !cargarNotas) && <NotasComponent state={{...this.state}} changeState={this.changeState} />}

											{
												(!nuevaTarea && cargarNotas) && <CargarNotasComponent state={{...this.state}} saveNota={this.submitTarea} changeState={this.changeState} submitTarea={this.submitTarea} updateMode={this.updateMode} selectFile={this.selectFile} onChange={this.onChange} />
											}
										</div>
									</div>

								</div>
							</div>
						</div>
					</div>	
				</div>
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));