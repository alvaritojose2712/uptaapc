import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {Headestudiante,Generalestudiante} from './estudiante/head.estudiante.jsx';
import Notasestudiante from './estudiante/estudiante.notas.jsx';
import EstudiantesList from './ce.estudiantesList.jsx';

import {handleNotification,Notification} from './handleNotification.jsx';






class App extends Component{
	constructor(){
		super()
		this.state = {
			view:0,
			viewE:0,//0 -> Datos  1 -> Notas

			id_notas:null,
			id_trimestre:null,
			id_trayecto:null,
			
			id_estudiante:null,
			id_carrera:null,

			estudiantes:[],

			todos:0,
			verificados:0,
			porverificar:0,
			inscripcionpen:0,

			filtro:"todos",
			busqueda:"",
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)

		this.changeState = this.changeState.bind(this)
		this.getIdEstudiante = this.getIdEstudiante.bind(this)
		this.verificar = this.verificar.bind(this)
		this.calcNum = this.calcNum.bind(this)





	}
	componentDidMount() {
		this
		.getApiData(null,"/controlEstudios/estudiantes","estudiantes",()=>this.calcNum())
			
	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop,call=null){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data},call?call:null)})
		.catch(err=>{console.log(err)})
	}
	getIdEstudiante(event){
		const {attributes} = event.currentTarget
		
		this.setState({
			id_estudiante: attributes["data-index"].value,
			id_carrera: attributes["data-carrera"].value, 
		});
	}

	verificar(event){
		let { 
			id_estudiante,
			estudiantes,
			id_carrera,
		} = this.state

		const {attributes} = event.currentTarget
		axios
		.post("/controlEstudios/estudiantes/verificar",{id:estudiantes[id_carrera][id_estudiante].id,modo:attributes["data-modo"].value})
		.then((data)=>{
			handleNotification(data)
			this.getApiData(null,"/controlEstudios/estudiantes","estudiantes",()=>this.calcNum())
		})
		.catch(error=>{handleNotification(error)})
	}
	calcNum(){
		
		let {estudiantes} = this.state
		let recalc = []
		for(let i in estudiantes){
			estudiantes[i].map(e=>recalc.push(e))
		}

		this.setState({
			todos:recalc.length,
			verificados:recalc.filter(e=>e.verificado).length,
			porverificar:recalc.filter(e=>!e.verificado&&e.inscrito).length,
			inscripcionpen:recalc.filter(e=>!e.inscrito).length, 
		});
	}


	
	render(){
		let { 
			id_estudiante,
			estudiantes,
			id_notas,
			id_trimestre,
			id_trayecto,
			id_carrera,
			viewE,

			todos,
			verificados,
			porverificar,
			inscripcionpen,

			filtro,
			busqueda,
		} = this.state
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col-4">
						<div className="form-group">
							<input type="text" className="form-control" placeholder="Buscar..." onChange={event=>this.changeState({busqueda:event.target.value})}/>
							<hr/>
							
								<h6 className={("hover d-inline mr-2 ")+(filtro=="todos"?"h4":"")} onClick={()=>this.changeState({filtro:"todos"})}><span className="badge alert-primary">Todos {todos}</span></h6>
								<h6 className={("hover d-inline mr-2 ")+(filtro=="verificados"?"h4":"")} onClick={()=>this.changeState({filtro:"verificados"})}><span className="badge alert-success">Verificados {verificados}</span></h6>
								<h6 className={("hover d-inline mr-2 ")+(filtro=="porverificar"?"h4":"")} onClick={()=>this.changeState({filtro:"porverificar"})}><span className="badge alert-warning">Por verificar {porverificar}</span></h6>
								<h6 className={("hover d-inline mr-2 ")+(filtro=="inscripcionpen"?"h4":"")} onClick={()=>this.changeState({filtro:"inscripcionpen"})}><span className="badge alert-danger">Inscripción pendiente {inscripcionpen}</span></h6>
							<hr/>
						</div>
						<EstudiantesList estudiantes={estudiantes} loc={this.loc} getIdEstudiante={this.getIdEstudiante} filtro={filtro} busqueda={busqueda}/>
					</div>
					<div className="col">
						{id_carrera!==null&&id_estudiante!==null&&estudiantes[id_carrera][id_estudiante]&&
							<React.Fragment>
									<Headestudiante estudiante={estudiantes[id_carrera][id_estudiante]} loc={this.loc}/>
									<div className="mb-2 mt-2 text-right">
										{!estudiantes[id_carrera][id_estudiante].inscrito?
										<button className="btn btn-danger"><i className="fa fa-times"></i> Pendiente formalizar inscripción</button>
										:null}

										{estudiantes[id_carrera][id_estudiante].verificado?
										<button 
										className="btn btn-success"
										onClick={this.verificar}
										data-modo="desverificar"
										><i className="fa fa-check"></i> Verificado</button>
										:null}
										
										{estudiantes[id_carrera][id_estudiante].inscrito&&!estudiantes[id_carrera][id_estudiante].verificado?
											<button 
											className="btn btn-warning"
											onClick={this.verificar}
											data-modo="verificar"
											><i className="fa fa-arrow-right"></i> Verificar</button>
											:null}
									</div>
									<div className="btn-group mb-4 mt-4">
										<button className={"btn btn-"+(viewE===0?"success":"primary")} onClick={()=>this.changeState({viewE:0})}>General</button>
										<button className={"btn btn-"+(viewE===1?"success":"primary")} onClick={()=>this.changeState({viewE:1})}>Notas</button>
									</div>
								{viewE===0&&<Generalestudiante estudiante={estudiantes[id_carrera][id_estudiante]} loc={this.loc}/>}
								{viewE===1&&<Notasestudiante	estudiante={estudiantes[id_carrera][id_estudiante]} />}
							</React.Fragment>
						}
					</div>
				</div>
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));


// <h3>Estudiantes</h3>
// <div className="form-group-search">
// 	<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/controlEstudios/estudiantes","estudiantes")} className="form-control"/>
// </div>
// <div className="tnz-file-tree">	
// 	{Object.entries(estudiantes).map((carrera,i)=>
// 		// searchuc===""||uc[0].toString().substr(0,searchuc.length).toLowerCase()===searchuc.toLowerCase()?
// 		<label className="tnz-file-tree-item year" key={i}>
// 			<input className="tnz-file-tree-cb" type="checkbox"/>
// 			<span className="tnz-file-tree-label hover">{carrera[0]}</span>
// 			<div  className="tnz-file-tree-branches">
// 				<label>
// 					<table className="table table-borderless">
// 						<tbody>
// 						{carrera[1].map((estudiante,i)=>
// 					  	<tr key={estudiante.id} onClick={()=>this.changeState({id_estudiante:i,id_carrera:carrera[0]})} className={(id_estudiante===i&&"alert-success")+" hover"}>
// 				  			<td><div className="mr-1 img-sm" style={{backgroundImage: `url('${this.loc}/${estudiante.file_foto}')` }}></div></td>
// 				  			<td>{estudiante.nombre} {estudiante.apellido}</td>
// 				  			<td>{estudiante.cedula}</td>
// 				  			<td>{estudiante.nombrecarrera.nombre}</td>
// 					  	</tr>
// 						)}
// 						</tbody>
// 					</table>
// 				</label>
// 			</div>
// 		</label>
// 		// :null
// 	)}
// </div>