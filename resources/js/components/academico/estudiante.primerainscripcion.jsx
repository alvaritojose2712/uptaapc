import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import Cargando from './cargando';

import cloneDeep from 'lodash/cloneDeep';


import {handleNotification,Notification} from './handleNotification.jsx';


class App extends Component{
	constructor(){
		super()
		this.state = {
			// modo:"trabajador",//trabajador|estudiante
			modo:"estudiante",//trabajador|estudiante
			nombrecarrera:"",
			user:{
				// Globals	
				nombre:"",
				apellido:"",
				cedula:"", 
				n_carnet:"",
				nacionalidad:"",//->Foreign
				genero:"",//->Foreign
				fecha_nacimiento:"",
				estado_civil:"",//->Foreign
				direccion:"",  
				telefono_1:"",
				telefono_2:"",
				correo:"",
				cuenta_bancaria:"",
				observacion:"",
				calzado:"",
				gorra:"",
				camisa:"",
				pantalon:"",
				file_cedula:"",
				file_foto:"",

				// Estudiante
				trabaja:"",  
				file_notas:"",
				file_fondo_negro:"",

				// Trabajador
				categoria:"",//->Foreign
				cargo:"",//->Foreign
				dedicacion:"",//->Foreign
				estado:"",//->Foreign
				estatus:"",//->Foreign
				grado_instruccion:"",//->Foreign
				departamento_adscrito:"",//->Foreign
				cargo_departamento:"",//->Foreign
				profesion:"",//->Foreign
				fecha_ingreso:"",
				caja_ahorro:"",  
				antiguedad_otros_ieu:"",
				hrs_nocturnas:"", 
				hrs_feriadas:"", 
				hrs_diurnas:"", 
				hrs_feriadas_nocturnas:"", 
				file_sintesis:"",
				// file_const_traba:"",
				// file_pago:"",



				// password:"",
				// role:"", 
				// verificado:"",  
				// inscrito:"",  
				// carrera:"",//->Foreign

				hijos:[],

			},

			nacionalidadArr:[],
			generoArr:[],
			estado_civilArr:[],
			categoriaArr:[],
			cargoArr:[],
			dedicacionArr:[],
			estadoArr:[],
			estatusArr:[],
			grado_instruccionArr:[],
			profesionArr:[],
			departamento_adscritoArr:[],
			cargo_departamentoArr:[],
			carreraArr:[],

			idInSession:null,

			activeLoading:false,
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)
		this.changeInput = this.changeInput.bind(this)
		this.submit = this.submit.bind(this)
		this.updateMode = this.updateMode.bind(this)


	}
	componentDidMount() {


		axios
		.get("/config/valores")
		.then(data=>{
			if (data.data) {
				this.setState({
					nacionalidadArr:data.data.filter(e=>e.campo==="nacionalidad"),
					generoArr:data.data.filter(e=>e.campo==="genero"),
					estado_civilArr:data.data.filter(e=>e.campo==="estado_civil"),
					categoriaArr:data.data.filter(e=>e.campo==="categoria"),
					cargoArr:data.data.filter(e=>e.campo==="cargo"),
					dedicacionArr:data.data.filter(e=>e.campo==="dedicacion"),
					estadoArr:data.data.filter(e=>e.campo==="estado"),
					estatusArr:data.data.filter(e=>e.campo==="estatus"),
					grado_instruccionArr:data.data.filter(e=>e.campo==="grado_instruccion"),
					profesionArr:data.data.filter(e=>e.campo==="profesion"),
					departamento_adscritoArr:data.data.filter(e=>e.campo==="departamento_adscrito"),
					cargo_departamentoArr:data.data.filter(e=>e.campo==="cargo_departamento"),
				});
			}
		})



		axios
		.post("getAuthId")
		.then(data=>{
			if (data.data.id) {
				this.setState(st=>({
					user: {...st.user, 
						nombre:data.data.nombre,
						apellido:data.data.apellido,
						cedula:data.data.cedula,
						telefono_1:data.data.telefono_1,
						correo:data.data.correo,
					},
					nombrecarrera:data.data.nombrecarrera?data.data.nombrecarrera.nombre:"",
				}));
			}
		})
	}
	lenValLimit(val,len){
		val = val.substr(0,len).replace(/[^0-9]/g,"")
		return val
	}
	changeInput(e){
		let {name,value,files} = e.target
		// console.log(files[0])
		
		if (name==="cedula") {	value = this.lenValLimit(value,10)	}
		if (name==="telefono_1"||name==="telefono_2") {	value = this.lenValLimit(value,12)	}

		if (name==="cuenta_bancaria") {	value = this.lenValLimit(value,22)	}
		if(
		name==="antiguedad_otros_ieu"||
		name==="hrs_nocturnas"||
		name==="hrs_feriadas"||
		name==="hrs_diurnas"||
		name==="hrs_feriadas_nocturnas"){
			value = this.lenValLimit(value,3)
		}
		if(name==="file_cedula"||
				name==="file_foto"||
				name==="file_notas"||
				name==="file_fondo_negro"||
				name==="file_const_traba"||
				name==="file_sintesis"||
				name==="file_pago"){
			if(files[0]){
				this.setState(st=>({
					user: {...st.user, [name]:files[0]}
				}));
			}
		}else{
			this.setState(st=>({
				user: {...st.user, [name]:value}
			}));
		}
		
		

	}
	updateMode(prop,value,i,type,field=null){
			
		this.setState(st=>{
			let user = cloneDeep(st.user)
			
			switch(type){
				case "update":
					user[prop][i].type = "update" 
				break;
				case "delModeUpdateDelete":
					delete user[prop][i].type 
				break;
				case "delNew":
					user[prop] = user[prop].filter((e,ii)=>ii!==i)
				break;
				case "addNew":
					let objNew = {}
					switch(prop){
						case "hijos":
							objNew =  {
								parentesco:"Hijo/a",
								nombre:"",
								apellido:"",
								genero:"Masculino",
								fecha_nacimiento:"",
								cedula:"",
								correo:"",
								telefono_1:"",

								estudia:"",
								discapacidad:"",

								type:"new",
							}
						break;
					}
					user[prop] = user[prop].concat(objNew)
				break;
				case "changeInput":
					let val = value
					if (field==="cedula") {	val = this.lenValLimit(val,10)	}
					if (field==="telefono_1"||field==="telefono_2") {	val = this.lenValLimit(val,12)	}
					user[prop][i][field] = val.toString().substr(0,35)
				break;
				case "delMode":
					user[prop][i].type = "delete" 
				break;
			}


			return {user:user}
		});
	}

	getApiData(e,url,prop){
		axios.get(url,{params:e})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}


	
	changeUniqueState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	
	submit(event){
		event.preventDefault()
		this.setState({
			activeLoading:true 
		});
		const config = {
			headers: {
				'content-type': "multipart/form-data"
			}
		}
		let formData = new FormData()

		Object.entries(this.state.user).map(e=>{
			let field = e[0]
			let val = e[1]
			if ( field === "hijos") val = JSON.stringify(val)
			formData.append(field,val)
		})
		formData.append("type","create")
		axios
		.post("/requisitos",formData,config)
		.then((data)=>{
			this.setState({
				activeLoading:false,
			});
			
			handleNotification(data)
			// console.log(data)
			if (data.data.estado) {
				window.location = window.location.href
			}

		})
		.catch(error=>{handleNotification(error)})
	}
	
	
	render(){
		let {
			// Globals	
			nombre,
			apellido,
			cedula, 
			nacionalidad,//->Foreign
			genero,//->Foreign
			estado_civil,//->Foreign
			direccion,  
			fecha_nacimiento,
			telefono_1,
			telefono_2,
			correo,
			cuenta_bancaria,
			observacion,
			n_carnet,
			calzado,
			gorra,
			camisa,
			pantalon,
			file_cedula,
			file_foto,

			// Estudiante
			trabaja,  
			file_notas,
			file_fondo_negro,

			// Trabajador
			categoria,//->Foreign
			cargo,//->Foreign
			dedicacion,//->Foreign
			estado,//->Foreign
			estatus,//->Foreign
			grado_instruccion,//->Foreign
			fecha_ingreso,
			caja_ahorro,  
			antiguedad_otros_ieu,
			hrs_nocturnas, 
			hrs_feriadas, 
			hrs_diurnas, 
			hrs_feriadas_nocturnas, 
			profesion,//->Foreign
			departamento_adscrito,//->Foreign
			cargo_departamento,//->Foreign
			// file_const_traba,
			file_sintesis,
			// file_pago,

			hijos,
		} = this.state.user

		let {
			nacionalidadArr,
			generoArr,
			estado_civilArr,
			categoriaArr,
			cargoArr,
			dedicacionArr,
			estadoArr,
			estatusArr,
			grado_instruccionArr,
			profesionArr,
			departamento_adscritoArr,
			cargo_departamentoArr,
			carreraArr,

			modo,
			nombrecarrera,
		} = this.state
		return(

			<div className="wraper-panel-pre-inscripcion">
				<Notification/>
				<div className="panel-pre-inscripcion">
					<form onSubmit={this.submit}>
						<div className="boton-fixed">
							<button
								className={"btn-success btn btn-xl btn-circle m-2"}
								onClick={this.save}>
									<i className={"fa fa-send"}></i>
							</button>
						</div>
						<header className="header-register">
							<div className="header-register-logo">
								<img src={this.loc+"/images/uptaapc/logo1.png"} alt=""/>
							</div>
							Inscripción <span className="badge badge-secondary m-2">{nombrecarrera}</span>
						</header>
						
						<Cargando active={this.state.activeLoading}/>
						<table className="table">
							<tbody>
								<tr className="">
									<td colSpan="2" className="text-center tr-separate-sections-table">
										<span className="">Documentos</span>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Foto</td>
									<td>
										<div className="text-center">
											<img src={file_foto?URL.createObjectURL(file_foto):""} alt="" className="m-2 img-md bg-dark"/>
										</div>

										<input type="file" className="form-control-file" name="file_foto" onChange={this.changeInput} required/>
										<hr/>
										{(file_foto?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Cédula escaneada</td>
									<td className="">
										<input type="file" className="form-control-file" name="file_cedula" onChange={this.changeInput} required/>
										<hr/>
										{(file_cedula?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
									</td>
								</tr>
								
								{modo==="estudiante"?
									<React.Fragment>
										<tr>
											<td className="text-right font-weight-bold">Notas certificadas</td>
											<td className="">
												<input type="file" className="form-control-file" name="file_notas" onChange={this.changeInput} required/>
												<hr/>
												{(file_notas?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
											</td>
										</tr>

										<tr>
											<td className="text-right font-weight-bold">Fondo negro del Título</td>
											<td className="">
												<input type="file" className="form-control-file" name="file_fondo_negro" onChange={this.changeInput} required/>
												<hr/>
												{(file_fondo_negro?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
											</td>
										</tr>
									</React.Fragment>
								:null}

								{modo==="trabajador"?
									<tr>
										<td className="text-right font-weight-bold">Síntesis Curricular</td>
										<td className="">
											<input type="file" className="form-control-file" name="file_sintesis" onChange={this.changeInput} required/>
											<hr/>
											{(file_sintesis?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
										</td>
									</tr>
								:null}

								<tr className="">
									<td colSpan="2" className="text-center tr-separate-sections-table">
										<span className="">Datos personales</span>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Nombres</td>
									<td className="">
										<input type="text" className={(nombre?"":"is-invalid")+" form-control-lg form-control"} placeholder="Introduzca ambos nombres" name="nombre" value={!nombre?"":nombre} onChange={this.changeInput} required/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold">Apellidos</td>
									<td className="">
										<input type="text" className={(apellido?"":"is-invalid")+" form-control-lg form-control"} placeholder="Introduzca ambos apellidos" name="apellido" value={!apellido?"":apellido} onChange={this.changeInput} required/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold">Cédula de Identidad</td>
									<td className="">
										<input type="text" className={(cedula?"":"is-invalid")+" form-control-lg form-control"} name="cedula" value={!cedula?"":cedula} onChange={this.changeInput} required/>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold">N° Carnet de la Patria</td>
									<td className="">
										<input type="text" className={(n_carnet?"":"is-invalid")+" form-control-lg form-control"} name="n_carnet" value={!n_carnet?"":n_carnet} onChange={this.changeInput} required/>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Nacionalidad</td>
									<td className="">
										<select className="form-control" name="nacionalidad" value={!nacionalidad?"":nacionalidad} onChange={this.changeInput} required>
											
											<option value="">-Seleccione-</option>
											{nacionalidadArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
											
							      </select>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Género</td>
									<td className="">
										<select className="form-control" name="genero" value={!genero?"":genero} onChange={this.changeInput} required>
											
											<option value="">-Seleccione-</option>
											{generoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
											
							      </select>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold">Fecha de Nacimiento</td>
									<td className="">
										<input type="date" className={(fecha_nacimiento?"":"is-invalid")+" form-control-lg form-control"} name="fecha_nacimiento" value={!fecha_nacimiento?"":fecha_nacimiento} onChange={this.changeInput} required/>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Estado Civil</td>
									<td className="">
										<select className="form-control" name="estado_civil" value={!estado_civil?"":estado_civil} onChange={this.changeInput} required>
											
											<option value="">-Seleccione-</option>
											{estado_civilArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
											
							      </select>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Cuenta Bancaria</td>
									<td className="">
										<input type="text" className={(cuenta_bancaria?"":"is-invalid")+" form-control-lg form-control"} name="cuenta_bancaria" value={!cuenta_bancaria?"":cuenta_bancaria} onChange={this.changeInput} required/>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold">Obeservación</td>
									<td>
										<textarea className={(observacion?"":"is-invalid")+" form-control-lg form-control"} name="observacion" value={!observacion?"":observacion} onChange={this.changeInput}></textarea>
									</td>
								</tr>
								
								{modo==="estudiante"?
								<tr>
									<td className="text-right font-weight-bold">¿Trabaja?</td>
									<td className="">
										<select className="form-control" name="trabaja" value={!trabaja?"":trabaja} onChange={this.changeInput} required>
											<option value="">-Seleccione-</option>
											<option value="1">Sí</option>
											<option value="0">No</option>
							      </select>
									</td>
								</tr>
								:null}
								
							

								

								<tr className="">
									<td colSpan="2" className="text-center tr-separate-sections-table">
										<span className="">Contacto</span>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold">Dirección</td>
									<td>
										<textarea className={(direccion?"":"is-invalid")+" form-control-lg form-control"} name="direccion" value={!direccion?"":direccion} onChange={this.changeInput}></textarea>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 1</td>
									<td>
										<input type="text" className={(telefono_1?"":"is-invalid")+" form-control-lg form-control"} name="telefono_1" value={!telefono_1?"":telefono_1} onChange={this.changeInput} required/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 2</td>
									<td>
										<input type="text" className={(telefono_2?"":"is-invalid")+" form-control-lg form-control"} name="telefono_2" value={!telefono_2?"":telefono_2} onChange={this.changeInput} required/>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold"><i className="fa fa-envelope"></i> Correo Electrónico</td>
									<td>
										<input type="text" className={(correo?"":"is-invalid")+" form-control-lg form-control"} name="correo" value={!correo?"":correo} onChange={this.changeInput} required/>
									</td>
								</tr>
								
								{modo==="trabajador"?
								<React.Fragment>
									<tr className="">
										<td colSpan="2" className="text-center tr-separate-sections-table">
											<span className="">Datos institucionales</span>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Categoría</td>
										<td className="">
											<select className="form-control" name="categoria" value={!categoria?"":categoria} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{categoriaArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>

									<tr>
										<td className="text-right font-weight-bold">Cargo</td>
										<td className="">
											<select className="form-control" name="cargo" value={!cargo?"":cargo} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{cargoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>

									<tr>
										<td className="text-right font-weight-bold">Dedicación</td>
										<td className="">
											<select className="form-control" name="dedicacion" value={!dedicacion?"":dedicacion} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{dedicacionArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>


									<tr>
										<td className="text-right font-weight-bold">Estado</td>
										<td className="">
											<select className="form-control" name="estado" value={!estado?"":estado} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{estadoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Estatus</td>
										<td className="">
											<select className="form-control" name="estatus" value={!estatus?"":estatus} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{estatusArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Grado de Instrucción</td>
										<td className="">
											<select className="form-control" name="grado_instruccion" value={!grado_instruccion?"":grado_instruccion} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{grado_instruccionArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>


									<tr>
										<td className="text-right font-weight-bold">Departamento Adscrito</td>
										<td className="">
											<select className="form-control" name="departamento_adscrito" value={!departamento_adscrito?"":departamento_adscrito} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{departamento_adscritoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Cargo desempeñado en el departamento</td>
										<td className="">
											<select className="form-control" name="cargo_departamento" value={!cargo_departamento?"":cargo_departamento} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{cargo_departamentoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Profesión</td>
										<td className="">
											<select className="form-control" name="profesion" value={!profesion?"":profesion} onChange={this.changeInput} required>
												
												<option value="">-Seleccione-</option>
												{profesionArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
												
								      </select>
										</td>
									</tr>

									<tr>
										<td className="text-right font-weight-bold">¿Aplica Caja de Ahorro?</td>
										<td className="">
											<select className="form-control" name="caja_ahorro" value={!caja_ahorro?"":caja_ahorro} onChange={this.changeInput} required>
												<option value="">-Seleccione-</option>
												<option value="1">Sí</option>
												<option value="0">No</option>
								      </select>
										</td>
									</tr>

									<tr>
										<td className="text-right font-weight-bold">Fecha de Ingreso</td>
										<td className="">
											<input type="date" className={(fecha_ingreso?"":"is-invalid")+" form-control-lg form-control"} name="fecha_ingreso" value={!fecha_ingreso?"":fecha_ingreso} onChange={this.changeInput} required/>
										</td>
									</tr>

									<tr>
										<td className="text-right font-weight-bold">Años en otros (IEU)</td>
										<td>
											<input type="text" className={(antiguedad_otros_ieu?"":"is-invalid")+" form-control-lg form-control"} name="antiguedad_otros_ieu" value={!antiguedad_otros_ieu?"":antiguedad_otros_ieu} onChange={this.changeInput}/>
										</td>
									</tr>

									<tr>
										<td className="text-right font-weight-bold">Horas Nocturnas</td>
										<td>
											<input type="text" className={(hrs_nocturnas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_nocturnas" value={!hrs_nocturnas?"":hrs_nocturnas} onChange={this.changeInput}/>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Horas Feriadas</td>
										<td>
											<input type="text" className={(hrs_feriadas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_feriadas" value={!hrs_feriadas?"":hrs_feriadas} onChange={this.changeInput}/>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Horas Diurnas</td>
										<td>
											<input type="text" className={(hrs_diurnas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_diurnas" value={!hrs_diurnas?"":hrs_diurnas} onChange={this.changeInput}/>
										</td>
									</tr>
									<tr>
										<td className="text-right font-weight-bold">Horas Feriadas nocturnas</td>
										<td>
											<input type="text" className={(hrs_feriadas_nocturnas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_feriadas_nocturnas" value={!hrs_feriadas_nocturnas?"":hrs_feriadas_nocturnas} onChange={this.changeInput}/>
										</td>
									</tr>

								</React.Fragment>
								:null}

								<tr className="">
									<td colSpan="2" className="text-center tr-separate-sections-table">
										<span className="">Tallas</span>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold">Camisa</td>
									<td>
										<input type="text" className={(camisa?"":"is-invalid")+" form-control-lg form-control"} name="camisa" value={!camisa?"":camisa} onChange={this.changeInput}/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold">Pantalón</td>
									<td>
										<input type="text" className={(pantalon?"":"is-invalid")+" form-control-lg form-control"} name="pantalon" value={!pantalon?"":pantalon} onChange={this.changeInput}/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold">Gorra</td>
									<td>
										<input type="text" className={(gorra?"":"is-invalid")+" form-control-lg form-control"} name="gorra" value={!gorra?"":gorra} onChange={this.changeInput}/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold">Calzado</td>
									<td>
										<input type="text" className={(calzado?"":"is-invalid")+" form-control-lg form-control"} name="calzado" value={!calzado?"":calzado} onChange={this.changeInput}/>
									</td>
								</tr>
								
								{modo==="trabajador"?
									<React.Fragment>
										<tr className="">
											<td colSpan="2" className="text-center tr-separate-sections-table">
												<span>Familiares <i className="fa fa-plus hover" onClick={()=>this.updateMode("hijos",null,null,"addNew")}></i></span>
											</td>
										</tr>
										<tr>
											<td colSpan="2">
												<table className="table">
													<thead>
														<tr>
															<th>Parentesco</th>
															<th>Nombres</th>
															<th>Apellidos</th>
															<th>Género</th>
															<th>Fecha de nacimiento</th>
															<th>Cédula</th>
															<th>Correo Electrónico</th>
															<th>Teléfono</th>
															<th>¿Discapacidad?</th>
															<th>¿Estudia?</th>
														</tr>
													</thead>
													<tbody>
														{hijos.map((fa,ifa)=>
															<tr key={ifa} className={(fa.type==="delete"?"opacity-md":"")}>
																<td>
																	<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.parentesco} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","parentesco")}>
																		<option value="Hijo/a">Hijo/a</option>
																		<option value="Madre">Madre</option>
																		<option value="Padre">Padre</option>
																  </select>
																</td>
																<td>
																	<input placeholder="Nombres" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.nombre} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","nombre")}/>
																</td>
																<td>
																	<input placeholder="Apellidos" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.apellido} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","apellido")}/>
																</td>
																<td>
																	<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.genero} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","genero")}>
																		<option value="Masculino">Masculino</option>
																		<option value="Femenino">Femenino</option>

																   </select>
																</td>
																<td>
																	<input type="date" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.fecha_nacimiento} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","fecha_nacimiento")}/>
																</td>
																<td>
																	<input placeholder="Cédula" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.cedula} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","cedula")}/>
																</td>
																<td>
																	<input placeholder="Correo Electrónico" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.correo} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","correo")}/>
																</td>
																<td>
																	<input placeholder="Teléfono de Contacto" type="text" disabled={!fa.type||fa.type==="delete"?true:false} className="form-control" value={fa.telefono_1} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","telefono_1")}/>
																</td>
																<td>
																	<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.discapacidad} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","genero")}>
																		<option value="1">Sí</option>
																		<option value="0">No</option>

																   </select>
																</td>
																<td>
																	<select className="form-control" disabled={!fa.type||fa.type==="delete"?true:false} value={fa.estudia} onChange={e=>this.updateMode("hijos",e.target.value,ifa,"changeInput","genero")}>
																		<option value="1">Sí</option>
																		<option value="0">No</option>

																   </select>
																</td>

																<td>
																  <div className="input-group-append">
																		{!fa.type?
																			<div>
																					<button className="btn btn-warning" onClick={()=>this.updateMode("hijos",null,ifa,"update")}><i className="fa fa-pencil"></i></button>
																					<button className="btn btn-danger" onClick={()=>this.updateMode("hijos",null,ifa,"delMode")}><i className="fa fa-trash"></i></button>
																			</div>
																			:null}
																		{fa.type==="new"?
																			<button className="btn btn-danger" onClick={()=>this.updateMode("hijos",null,ifa,"delNew")}><i className="fa fa-times"></i></button>
																			:null}
																		{fa.type==="update"?
																			<button className="btn btn-warning" onClick={()=>this.updateMode("hijos",null,ifa,"delModeUpdateDelete")}><i className="fa fa-times"></i></button>
																		:null}
																		{fa.type==="delete"?
																			<button className="btn btn-danger" onClick={()=>this.updateMode("hijos",null,ifa,"delModeUpdateDelete")}><i className="fa fa-arrow-left"></i></button>
																		:null}
																  </div>
																</td>

															</tr>
														)}
														<tr></tr>
													</tbody>
												</table>
											</td>
										</tr>
									</React.Fragment>
								:null}

							</tbody>
						</table>
						
					</form>
				</div>
			</div>

		);
	}
}
render(<App/>,document.querySelector('#appreact'));

