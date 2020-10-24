import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {handleNotification,Notification} from '../handleNotification.jsx';



import {List} from './list.jsx';

class App extends Component{
	constructor(){
		super()
		this.state = {
			
			profesor:{},
			search:"",

			idtray:null,
			idtri:null,
			idsecc:null,
			id_uc:null,
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)

		this.changeState = this.changeState.bind(this)
		this.saveNota = this.saveNota.bind(this)
		this.selectFile = this.selectFile.bind(this)

	}
	componentDidMount() {
		this.getApiData(null,"/profesor/academico","profesor")
	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{
			this.setState({[prop]:data.data})
		})
		.catch(err=>{console.log(err)})
	}
	saveNota(){
		let { 
			profesor,
			idtray,
			idtri,
			idsecc,
			id_uc,
		} = this.state
		
		axios
		.post("/profesor/cargar/notas",{
			notas: profesor[idtray][idtri][idsecc][id_uc].map(e=>e.notas).filter(e=>!(e==false)),
		})
		.then(data=>{
			handleNotification(data)
			this.getApiData(null,"/profesor/academico","profesor")
		})
		.catch(error=>{
			handleNotification(error)
		})
		
		
	}
	selectFile(e,text=null){
		let {
			id_uc,
			idsecc,
			idtray,
			idtri,
			notas,
			profesor
		} = this.state

		let newPro = profesor
		const callback = contenido => {
			if (contenido.length) {
				newPro[idtray][idtri][idsecc][id_uc].map((e,i)=>{
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
					profesor:newPro 
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
			let profesor = Object.assign({},pr.profesor)
			
			switch(type){
				case "update":
					profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas[i].type = "update" 
				break;
				case "delModeUpdateDelete":
					delete profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas[i].type 
				break;
				case "delNew":
					profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas = profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas.filter((e,ii)=>ii!==i)
				break;
				case "addNew":
					profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas = profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas.concat({id_trayecto:id_trayecto,modo:"",puntos:0,type:"new"})
				break;
				case "changeInput":
					profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas[i].puntos = val==""?"":(parseFloat(val)>100?100:parseFloat(val))
				break;
				case "changeInputModo":
					profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas[i].modo = val.substr(0,25)
				break;
				case "delMode":
					profesor[pr.idtray][pr.idtri][pr.idsecc][pr.id_uc][id].notas[i].type = "delete" 
				break;
			}


			return {profesor}
		});
	}
	
	render(){
		let returnUrl = arr=>(
			arr.map((e,i)=>
				<React.Fragment key={i}>
				 <span className="text-primary h4">{e}</span><span className="h2 mr-2 ml-2">{(i==arr.length-1)?"":" / "}</span>
				</React.Fragment>
			)
		)
		let { 
			profesor,
			idtray,
			idtri,
			idsecc,
			id_uc,
			search
		} = this.state

		return(
			<React.Fragment>
				<Notification />
				<div className="container">
						<div className="p-3 border border-dark rounded">
							<div className="mb-3">
								<input type="text" placeholder="Buscar..." className="form-control w-25" onChange={e=>this.changeState({search:e.target.value.toLowerCase()})}/>
							</div>
							{idtray===null?<List filter={search} returnUrl={returnUrl} obj={profesor} changeState={this.changeState} preprop="idtray" prop="idtray" title="" />:null}
							
							{idtri===null&&
								profesor[idtray]?<List filter={search} returnUrl={returnUrl} obj={profesor[idtray]} changeState={this.changeState} preprop="idtray" prop="idtri" title={[idtray]} />:null}
							{idsecc===null&&
								profesor[idtray]&&
								profesor[idtray][idtri]?<List filter={search} returnUrl={returnUrl} obj={profesor[idtray][idtri]} changeState={this.changeState} preprop="idtri" prop="idsecc" title={[idtray,idtri]} />:null}
							{id_uc===null&&
								profesor[idtray]&&
								profesor[idtray][idtri]&&
								profesor[idtray][idtri][idsecc]?<List filter={search} returnUrl={returnUrl} obj={profesor[idtray][idtri][idsecc]} changeState={this.changeState} preprop="idsecc" prop="id_uc" title={[idtray,idtri,idsecc]} />:null}

							{id_uc!==null&&
								profesor[idtray]&&
								profesor[idtray][idtri]&&
								profesor[idtray][idtri][idsecc]&&
								profesor[idtray][idtri][idsecc][id_uc]?
								<React.Fragment>
									<div className={"mb-3"}>
										<i className="fa fa-arrow-left mr-3 hover" onClick={()=>this.changeState({id_uc:null})}></i>
										{returnUrl([idtray,idtri,idsecc,id_uc])}
									</div>
									<table className="table">
										<thead>
										<tr>
											<th colSpan="5"></th>
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
												    <input type="file" className="custom-file-input" accept=".txt" onChange={this.selectFile}/>
												    <label className="custom-file-label">Seleccionar .txt</label>
												  </div>
												  
												</div>
											</th>
										</tr>
											<tr>
												<th>ID</th>
												<th></th>
												<th>Nombres y Apellidos</th>
												<th>Sexo</th>
												<th>Cédula</th>
												<th>Puntos</th>
													<th>
													{profesor[idtray][idtri][idsecc][id_uc].map(e=>e.notas).filter(e=>!(e==false)).length?
															<button className="btn btn-primary" onClick={this.saveNota}><i className="fa fa-send"></i></button>
														:null}
													</th>
											</tr>
										</thead>
										<tbody>
											{profesor[idtray][idtri][idsecc][id_uc].map((e,i)=>
												(search==e.estudiante.nombre.substr(0,search.length).toLowerCase()||
												search==e.estudiante.apellido.substr(0,search.length).toLowerCase()||
												search==e.estudiante.cedula.toString().substr(0,search.length).toLowerCase()
												||search=="")&&e.inscripcion?
												  <tr key={e.estudiante.id}>
														<td>{e.estudiante.id}</td>
														<td><div className="img-sm" style={{backgroundImage:"url('"+this.loc+"/"+e.estudiante.file_foto+"')"}}></div></td>
														<td>{e.estudiante.nombre} {e.estudiante.apellido}</td>
														<td><span className={"badge badge-"+(e.estudiante.sexo==="Masculino"?"primary":"warning")}>{e.estudiante.sexo}</span></td>
														<td>{e.estudiante.cedula}</td>
														<td>
															{e.editable?
																<React.Fragment>

																	
																	{e.notas.map((nota,inota)=>
																		<React.Fragment key={inota}>

																			<div className={"input-group "+(nota.type==="delete"&&"opacity-md")}>
																				<input type="number" disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" min="0" max="99" value={nota.puntos} onChange={event=>this.updateMode(event.target.value,inota,i,"changeInput")} placeholder="Pts"/>
																				<input type="text" disabled={!nota.type||nota.type==="delete"?true:false} className="form-control" value={nota.modo} onChange={event=>this.updateMode(event.target.value,inota,i,"changeInputModo")} placeholder="Modo. Ejemplo: Nota final, Recuperativo"/>
																			 <div className="input-group-append">
																					{!nota.type?
																						<div>
																								<button className="btn btn-warning" onClick={()=>this.updateMode(null,inota,i,"update")}><i className="fa fa-pencil"></i></button>
																								<button className="btn btn-danger" onClick={()=>this.updateMode(null,inota,i,"delMode")}><i className="fa fa-trash"></i></button>
																						</div>
																						:null}
																					{nota.type==="new"?
																						<button className="btn btn-danger" onClick={()=>this.updateMode(null,inota,i,"delNew")}><i className="fa fa-times"></i></button>
																						:null}
																					{nota.type==="update"?
																						<button className="btn btn-warning" onClick={()=>this.updateMode(null,inota,i,"delModeUpdateDelete")}><i className="fa fa-times"></i></button>
																					:null}
																					{nota.type==="delete"?
																						<button className="btn btn-danger" onClick={()=>this.updateMode(null,inota,i,"delModeUpdateDelete")}><i className="fa fa-arrow-left"></i></button>
																					:null}
																			  </div>
																			</div>

																		</React.Fragment>
																	)}
																
																</React.Fragment>
															:<ul className="list-group">
																{e.notas.map((ee,ii)=>
																	<li key={ii} className="list-group-item">{ee.puntos} / {ee.modo}</li>
																)}
															</ul>}
														</td>
														<td>
															<button className="btn btn-success" onClick={()=>this.updateMode(null,null,i,"addNew",e.id)}><i className="fa fa-plus"></i></button>
														</td>
													</tr>
												:null
											)}
										</tbody>
									</table>
		
								</React.Fragment>:null}
						</div>
						
				</div>
			</React.Fragment>

		);
	}
}
render(<App/>,document.getElementById('appreact'));
