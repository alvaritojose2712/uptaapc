import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import Cargando from '../../../../assets/cargando';
import cloneDeep from 'lodash/cloneDeep';

import {formatCedula,diffFecha,lenValLimit} from '../../../../assets/custom';
import {handleNotification,Notification} from '../../../../assets/handleNotification.jsx';

const controller = "/rrhh/personal"
const nameProp = "´personal" //Array All records

const searchKeys = ["id","nombre","apellido"]

const searchParams = (q,e) => {
  let ret = false
  searchKeys.map(key=>{
    if (e[key].toString().toLowerCase().startsWith(q.toLowerCase())) ret = true
  })

  return ret
}


class App extends Component{
	constructor(){
		super()
		this.state = {
			type: "trabajador",
			activeLoading: false,
			[nameProp]:[],
      iditemselect:null,
      
			modal:false,
      type_modal:"",
      
      q:"",
      limit:"10",

      modo:"create", //create || update
      idupdate:null,

			
			user: {
				nombre: "",
				apellido: "",
				cedula: "",
				n_carnet: "",
				nacionalidad: "",
				genero: "",
				fecha_nacimiento: "",
				estado_civil: "",
				direccion: "",
				telefono_1: "",
				telefono_2: "",
				correo: "",
				cuenta_bancaria: "",
				observacion: "",
				calzado: "",
				gorra: "",
				camisa: "",
				pantalon: "",
				file_cedula: "",
				file_foto: "",
				trabaja: "",
				file_notas: "",
				file_fondo_negro: "",
				categoria: "",
				cargo: "",
				dedicacion: "",
				estado: "",
				estatus: "",
				grado_instruccion: "",
				departamento_adscrito: "",
				cargo_departamento: "",
				profesion: "",
				fecha_ingreso: "",
				caja_ahorro: "",
				antiguedad_otros_ieu: "",
				hrs_nocturnas: "",
				hrs_feriadas: "",
				hrs_diurnas: "",
				hrs_feriadas_nocturnas: "",
				file_sintesis: "",
				file_const_traba: "",
				file_pago: "",
				password: "",
				// role: "",
				// verificado: "",
				// inscrito: "",
				carrera: "",
				hijos: [],
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
		}
		this.loc = window.location.origin+"/"
		this.getApiData = this.getApiData.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)

		this.submit = this.submit.bind(this)
		this.changeinput = this.changeinput.bind(this)
		this.onChange = this.onChange.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.remove = this.remove.bind(this)
		this.search = this.search.bind(this)
		this.edit = this.edit.bind(this)
		this.updateMode = this.updateMode.bind(this)

	}
	componentDidMount() {
	  // const partidaId = new URLSearchParams(window.location.search).get('partida');
	  this.getApiData(null,controller,nameProp)

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
	}

	getApiData(e,url,prop){
		axios.get(url,{ params:{q:(e?e.target.value:""),limit:""} })
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}
	changeUniqueState(e){
		this.setState(e);
	}
	closeModal(){
		this.setState({modal:false,type_modal:""});
  }
  onChange(event){
    let e = event.currentTarget
    let name = e.attributes.name.value
    let value = e.value

    if (name==="monto") {value = inputMoneda(e.value)}
    this.setState({[name]: value });
  };
	changeinput(e){
		let {name,value,files} = e.target
		// console.log(files[0])
		
		if (name==="cedula") {	value = lenValLimit(value,10)	}
		if (name==="telefono_1"||name==="telefono_2") {	value = lenValLimit(value,12)	}

		if (name==="cuenta_bancaria") {	value = lenValLimit(value,22)	}
		if(
		name==="antiguedad_otros_ieu"||
		name==="hrs_nocturnas"||
		name==="hrs_feriadas"||
		name==="hrs_diurnas"||
		name==="hrs_feriadas_nocturnas"){
			value = lenValLimit(value,3)
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
	};

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
					if (field==="cedula") {	val = lenValLimit(val,10)	}
					if (field==="telefono_1"||field==="telefono_2") {	val = lenValLimit(val,12)	}
					user[prop][i][field] = val.toString().substr(0,35)
				break;
				case "delMode":
					user[prop][i].type = "delete" 
				break;
			}


			return {user:user}
		});
	}
	
  remove(e){
    if(confirm("¿Seguro de eliminar?")){

      this.setState({activeLoading:true});

      const objSend = {
        id: e.currentTarget.attributes["data-id"].value,
        modo: "delete"
      }

      axios
      .post("/rrhh/personal/delete",objSend)
      .then((data)=>{
        this.setState({activeLoading:false,idupdate:null,iditemselect:null});
        handleNotification(data)
        this.search()
      })
    }
  }
  search(event=null){this.getApiData(event,controller,nameProp)}
	submit(event){
		event.preventDefault()
		this.setState({activeLoading:true});
		
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

		formData.append("modo",this.state.modo)
		formData.append("idupdate",this.state.idupdate)


		axios
		.post(controller,formData,config)
		.then((data)=>{
			this.setState({activeLoading:false});
      handleNotification(data)
      this.search()
		})
		.catch(error=>{handleNotification(error)})
	}
  edit(event){
    let e = event.currentTarget
    let h = this.state[nameProp].filter(e=> (this.state.q==="") || (this.state.q!=="" && searchParams(this.state.q,e)) )[e.attributes["data-index"].value]
    delete h.file_cedula
		delete h.file_foto
		delete h.file_notas
		delete h.file_fondo_negro
		delete h.file_sintesis
		delete h.file_const_traba
		delete h.file_pago
    this.setState(st=>({
    	user: h 

    }));
    this.changeUniqueState({modal:true, type_modal:"addItem", modo:"update", idupdate:h.id,iditemselect:null})
  }
	render(){

		let { 
			iditemselect,

			modal,
			type_modal,
			activeLoading,

			modo,
			idupdate,

			q,
			limit,

			user,

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

			type,

		} = this.state

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
		} = user

		



	  let dataShow = this.state[nameProp].filter(e=> (q==="") || (q!=="" && searchParams(q,e)) )

		return(
			<React.Fragment>
				<Notification/>
				<div className="container-fluid">
          <div className="row">
            <div className="col">
              <h4 className="text-center">RR.HH.</h4>
              <h1 className="text-center">Profesores</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {type_modal==="detalles"?
                <div className="border p-4 border-dark rounded">
                    
                  {iditemselect!==null&&dataShow[iditemselect]?
	                  <div className="">
	                  	<div>
												<span>
													<h1>
														<span title="apellido"><b>{dataShow[iditemselect].apellido}</b>, </span>
														<span title="nombre">{dataShow[iditemselect].nombre}</span> 
													</h1>
												</span>
											</div>
											<div className="text-right">
												<code>
												<h2><span title="nacionalidad">{dataShow[iditemselect].nacionalidad}</span>-<b>{formatCedula(dataShow[iditemselect].cedula)}</b></h2>
												</code>
											</div>
											<div className="text-right">
												<span className="text-height h4" title="estado">{dataShow[iditemselect].estado}</span>
											</div>
											<div>
												<table className="table font-20x">
													<thead>
														<tr>
															<th>Estatus</th>
															<th>Categoría</th>
															<th>Cargo</th>
															<th>Dedicación</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td title="estatus">{dataShow[iditemselect].estatus}</td>
															<td title="categoria">{dataShow[iditemselect].categoria}</td>
															<td title="cargo">{dataShow[iditemselect].cargo}</td>
															<td title="dedicacion">{dataShow[iditemselect].dedicacion}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<table className="table">
													<thead>
														<tr>
															<th>Género</th>
															<th>Fecha de nacimiento</th>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td title="genero">{dataShow[iditemselect].genero}</td>
															<td><span title="fecha_nacimiento">{dataShow[iditemselect].fecha_nacimiento}</span> (<span className="años font-weight-bold"></span>{diffFecha(dataShow[iditemselect].fecha_nacimiento)} años)</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<table className="table table-info">
													<thead>
														<tr>
															<td className="text-center"><i className="fa fa-phone fa-3x"></i></td>
															<td className="text-center"><i className="fa fa-phone-square fa-3x"></i></td>
															<td className="text-center"><i className="fa fa-envelope fa-3x"></i></td>
														</tr>
													</thead>
													<tbody>
														<tr>
															<td className="text-center">{dataShow[iditemselect].telefono_1}</td>
															<td className="text-center">{dataShow[iditemselect].telefono_2}</td>
															<td className="text-center">{dataShow[iditemselect].correo}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<table className="table font-20x">
													<tbody>
														<tr>
															<th>Cuenta Bancaria</th>
															<td title="cuenta_bancaria">{dataShow[iditemselect].cuenta_bancaria}</td>
														</tr>
														<tr>
															<th>Fecha de ingreso</th>
															<td><span title="fecha_ingreso">{dataShow[iditemselect].fecha_ingreso}</span><span className="hace-fecha-ingreso"> (Hace <span className="años-fecha-ingreso font-weight-bold"></span>{diffFecha(dataShow[iditemselect].fecha_ingreso)} años)</span></td>
														</tr>
														<tr>
															<th>Antiguedad en otros IEU</th>
															<td><span title="antiguedad_otros_ieu">{dataShow[iditemselect].antiguedad_otros_ieu}</span> años</td>
														</tr>
														<tr>
															<th>¿Aplica a caja de ahorro?</th>
															<td title="caja_ahorro">{dataShow[iditemselect].caja_ahorro?"Si":"No"}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<table className="table font-20x table-striped">
													<tbody>
														<tr>
															<th>Grado de instrucción</th>
															<td title="grado_instruccion">{dataShow[iditemselect].grado_instruccion}</td>
														</tr>
														<tr>
															<th>Profesión</th>
															<td title="profesion">{dataShow[iditemselect].profesion}</td>
														</tr>
														<tr>
															<th>Departamento abscrito</th>
															<td title="departamento_adscrito" className="text-info">{dataShow[iditemselect].departamento_adscrito}</td>
														</tr>
														<tr>
															<th>Cargo desenpeñado en el departamento</th>
															<td title="cargo_departamento">{dataShow[iditemselect].cargo_departamento}</td>
														</tr>
														<tr>
															<th>Horas Extras-Diurnas</th>
															<td title="hrs_diurnas">{dataShow[iditemselect].hrs_diurnas}</td>
														</tr>
														<tr>
															<th>Horas Extras-Nocturnas</th>
															<td title="hrs_nocturnas">{dataShow[iditemselect].hrs_nocturnas}</td>
														</tr>
														<tr>
															<th>Horas Extras-Feriadas</th>
															<td title="hrs_feriadas">{dataShow[iditemselect].hrs_feriadas}</td>
														</tr>
														<tr>
															<th>Horas Feriadas-Nocturnas</th>
															<td title="hrs_feriadas_nocturnas">{dataShow[iditemselect].hrs_feriadas_nocturnas}</td>
														</tr>
													</tbody>
												</table>
											</div>
											<div>
												<h1>Hijos de {nombre} <span className="numero_hijos font-weight-bold"></span></h1>
												<table className="table table-info font-20x">
													<thead>
														<tr>
															<th>Nombres y Apellidos</th>
															<th>Género</th>
															<th>Fecha de nacimiento</th>
															<th>¿Es estudiante?</th>
															<th>¿Tiene alguna discapacidad?</th>
														</tr>
													</thead>
													<tbody>
														{dataShow[iditemselect].hijos.map((e,i)=>(
															 <tr key={i}>
																<td>{e.nombres_apellidos_hijo}</td>
																<td>{e.genero_hijo}</td>
																<td>{e.fecha_nacimiento_hijo}</td>
																<td>{e.estudiante_hijo?"Si":"No"}</td>
																<td>{e.discapacidad_hijo?"Si":"No"}</td>
															</tr>
														))}
													</tbody>
												</table>
												{
										  			hijos==0
										  			? <h3 className="text-center">¡Sin carga familiar!</h3>
									  				: null
										  		}
											</div>
	                  </div>
                  :null}
                </div>
              :null}
              {type_modal==="addItem"?
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
										{this.state.modo==="update"?"Modificar datos":"Registrar"} <span className="badge badge-secondary m-2"></span>
									</header>
						      <div className="d-flex justify-content-center align-items-center flex-column">
						        
						      </div>
						      <div className="border p-4 border-dark rounded">
						        {modo==="update"&&<h1 className="text-right">Editando: {idupdate}</h1>}
						        <div className="mt-5">
						        
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
															

															<input type="file" className="form-control-file" name="file_foto" onChange={this.changeinput} />
															<hr/>
															{(file_foto?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
														</td>
													</tr>

													<tr>
														<td className="text-right font-weight-bold">Cédula escaneada</td>
														<td className="">
															<input type="file" className="form-control-file" name="file_cedula" onChange={this.changeinput} />
															<hr/>
															{(file_cedula?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
														</td>
													</tr>
													
													{type==="estudiante"?
														<React.Fragment>
															<tr>
																<td className="text-right font-weight-bold">Notas certificadas</td>
																<td className="">
																	<input type="file" className="form-control-file" name="file_notas" onChange={this.changeinput} />
																	<hr/>
																	{(file_notas?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
																</td>
															</tr>

															<tr>
																<td className="text-right font-weight-bold">Fondo negro del Título</td>
																<td className="">
																	<input type="file" className="form-control-file" name="file_fondo_negro" onChange={this.changeinput} />
																	<hr/>
																	{(file_fondo_negro?"":<h5 className="text-danger">Seleccione un archivo .png | .jpg | .pdf | Max: 500Kb</h5>)}
																</td>
															</tr>
														</React.Fragment>
													:null}

													{type==="trabajador"?
														<tr>
															<td className="text-right font-weight-bold">Síntesis Curricular</td>
															<td className="">
																<input type="file" className="form-control-file" name="file_sintesis" onChange={this.changeinput} />
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
															<input type="text" className={(nombre?"":"is-invalid")+" form-control-lg form-control"} placeholder="Introduzca ambos nombres" name="nombre" value={!nombre?"":nombre} onChange={this.changeinput} required/>
														</td>
													</tr>
													<tr>
														<td className="text-right font-weight-bold">Apellidos</td>
														<td className="">
															<input type="text" className={(apellido?"":"is-invalid")+" form-control-lg form-control"} placeholder="Introduzca ambos apellidos" name="apellido" value={!apellido?"":apellido} onChange={this.changeinput} required/>
														</td>
													</tr>
													<tr>
														<td className="text-right font-weight-bold">Cédula de Identidad</td>
														<td className="">
															<input type="text" className={(cedula?"":"is-invalid")+" form-control-lg form-control"} name="cedula" value={!cedula?"":cedula} onChange={this.changeinput} required/>
														</td>
													</tr>
													
													<tr>
														<td className="text-right font-weight-bold">N° Carnet de la Patria</td>
														<td className="">
															<input type="text" className={(n_carnet?"":"is-invalid")+" form-control-lg form-control"} name="n_carnet" value={!n_carnet?"":n_carnet} onChange={this.changeinput} required/>
														</td>
													</tr>

													<tr>
														<td className="text-right font-weight-bold">Nacionalidad</td>
														<td className="">
															<select className="form-control" name="nacionalidad" value={!nacionalidad?"":nacionalidad} onChange={this.changeinput} required>
																
																<option value="">-Seleccione-</option>
																{nacionalidadArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																
												      </select>
														</td>
													</tr>

													<tr>
														<td className="text-right font-weight-bold">Género</td>
														<td className="">
															<select className="form-control" name="genero" value={!genero?"":genero} onChange={this.changeinput} required>
																
																<option value="">-Seleccione-</option>
																{generoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																
												      </select>
														</td>
													</tr>
													
													<tr>
														<td className="text-right font-weight-bold">Fecha de Nacimiento</td>
														<td className="">
															<input type="date" className={(fecha_nacimiento?"":"is-invalid")+" form-control-lg form-control"} name="fecha_nacimiento" value={!fecha_nacimiento?"":fecha_nacimiento} onChange={this.changeinput} required/>
														</td>
													</tr>

													<tr>
														<td className="text-right font-weight-bold">Estado Civil</td>
														<td className="">
															<select className="form-control" name="estado_civil" value={!estado_civil?"":estado_civil} onChange={this.changeinput} required>
																
																<option value="">-Seleccione-</option>
																{estado_civilArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																
												      </select>
														</td>
													</tr>

													<tr>
														<td className="text-right font-weight-bold">Cuenta Bancaria</td>
														<td className="">
															<input type="text" className={(cuenta_bancaria?"":"is-invalid")+" form-control-lg form-control"} name="cuenta_bancaria" value={!cuenta_bancaria?"":cuenta_bancaria} onChange={this.changeinput} required/>
														</td>
													</tr>
													
													<tr>
														<td className="text-right font-weight-bold">Obeservación</td>
														<td>
															<textarea className={(observacion?"":"is-invalid")+" form-control-lg form-control"} name="observacion" value={!observacion?"":observacion} onChange={this.changeinput}></textarea>
														</td>
													</tr>
													
													{type==="estudiante"?
													<tr>
														<td className="text-right font-weight-bold">¿Trabaja?</td>
														<td className="">
															<select className="form-control" name="trabaja" value={!trabaja?"":trabaja} onChange={this.changeinput} required>
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
															<textarea className={(direccion?"":"is-invalid")+" form-control-lg form-control"} name="direccion" value={!direccion?"":direccion} onChange={this.changeinput}></textarea>
														</td>
													</tr>
													
													<tr>
														<td className="text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 1</td>
														<td>
															<input type="text" className={(telefono_1?"":"is-invalid")+" form-control-lg form-control"} name="telefono_1" value={!telefono_1?"":telefono_1} onChange={this.changeinput} required/>
														</td>
													</tr>
													<tr>
														<td className="text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 2</td>
														<td>
															<input type="text" className={(telefono_2?"":"is-invalid")+" form-control-lg form-control"} name="telefono_2" value={!telefono_2?"":telefono_2} onChange={this.changeinput} required/>
														</td>
													</tr>
													
													<tr>
														<td className="text-right font-weight-bold"><i className="fa fa-envelope"></i> Correo Electrónico</td>
														<td>
															<input type="text" className={(correo?"":"is-invalid")+" form-control-lg form-control"} name="correo" value={!correo?"":correo} onChange={this.changeinput} required/>
														</td>
													</tr>
													
													{type==="trabajador"?
													<React.Fragment>
														<tr className="">
															<td colSpan="2" className="text-center tr-separate-sections-table">
																<span className="">Datos institucionales</span>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Categoría</td>
															<td className="">
																<select className="form-control" name="categoria" value={!categoria?"":categoria} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{categoriaArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>

														<tr>
															<td className="text-right font-weight-bold">Cargo</td>
															<td className="">
																<select className="form-control" name="cargo" value={!cargo?"":cargo} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{cargoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>

														<tr>
															<td className="text-right font-weight-bold">Dedicación</td>
															<td className="">
																<select className="form-control" name="dedicacion" value={!dedicacion?"":dedicacion} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{dedicacionArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>


														<tr>
															<td className="text-right font-weight-bold">Estado</td>
															<td className="">
																<select className="form-control" name="estado" value={!estado?"":estado} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{estadoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Estatus</td>
															<td className="">
																<select className="form-control" name="estatus" value={!estatus?"":estatus} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{estatusArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Grado de Instrucción</td>
															<td className="">
																<select className="form-control" name="grado_instruccion" value={!grado_instruccion?"":grado_instruccion} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{grado_instruccionArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>


														<tr>
															<td className="text-right font-weight-bold">Departamento Adscrito</td>
															<td className="">
																<select className="form-control" name="departamento_adscrito" value={!departamento_adscrito?"":departamento_adscrito} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{departamento_adscritoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Cargo desempeñado en el departamento</td>
															<td className="">
																<select className="form-control" name="cargo_departamento" value={!cargo_departamento?"":cargo_departamento} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{cargo_departamentoArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Profesión</td>
															<td className="">
																<select className="form-control" name="profesion" value={!profesion?"":profesion} onChange={this.changeinput} required>
																	
																	<option value="">-Seleccione-</option>
																	{profesionArr.map(e=><option key={e.id} value={e.valor}>{e.valor}</option>)}
																	
													      </select>
															</td>
														</tr>

														<tr>
															<td className="text-right font-weight-bold">¿Aplica Caja de Ahorro?</td>
															<td className="">
																<select className="form-control" name="caja_ahorro" value={!caja_ahorro?"":caja_ahorro} onChange={this.changeinput} required>
																	<option value="">-Seleccione-</option>
																	<option value="1">Sí</option>
																	<option value="0">No</option>
													      </select>
															</td>
														</tr>

														<tr>
															<td className="text-right font-weight-bold">Fecha de Ingreso</td>
															<td className="">
																<input type="date" className={(fecha_ingreso?"":"is-invalid")+" form-control-lg form-control"} name="fecha_ingreso" value={!fecha_ingreso?"":fecha_ingreso} onChange={this.changeinput} required/>
															</td>
														</tr>

														<tr>
															<td className="text-right font-weight-bold">Años en otros (IEU)</td>
															<td>
																<input type="text" className={(antiguedad_otros_ieu?"":"is-invalid")+" form-control-lg form-control"} name="antiguedad_otros_ieu" value={!antiguedad_otros_ieu?"":antiguedad_otros_ieu} onChange={this.changeinput}/>
															</td>
														</tr>

														<tr>
															<td className="text-right font-weight-bold">Horas Nocturnas</td>
															<td>
																<input type="text" className={(hrs_nocturnas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_nocturnas" value={!hrs_nocturnas?"":hrs_nocturnas} onChange={this.changeinput}/>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Horas Feriadas</td>
															<td>
																<input type="text" className={(hrs_feriadas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_feriadas" value={!hrs_feriadas?"":hrs_feriadas} onChange={this.changeinput}/>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Horas Diurnas</td>
															<td>
																<input type="text" className={(hrs_diurnas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_diurnas" value={!hrs_diurnas?"":hrs_diurnas} onChange={this.changeinput}/>
															</td>
														</tr>
														<tr>
															<td className="text-right font-weight-bold">Horas Feriadas nocturnas</td>
															<td>
																<input type="text" className={(hrs_feriadas_nocturnas?"":"is-invalid")+" form-control-lg form-control"} name="hrs_feriadas_nocturnas" value={!hrs_feriadas_nocturnas?"":hrs_feriadas_nocturnas} onChange={this.changeinput}/>
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
															<input type="text" className={(camisa?"":"is-invalid")+" form-control-lg form-control"} name="camisa" value={!camisa?"":camisa} onChange={this.changeinput}/>
														</td>
													</tr>
													<tr>
														<td className="text-right font-weight-bold">Pantalón</td>
														<td>
															<input type="text" className={(pantalon?"":"is-invalid")+" form-control-lg form-control"} name="pantalon" value={!pantalon?"":pantalon} onChange={this.changeinput}/>
														</td>
													</tr>
													<tr>
														<td className="text-right font-weight-bold">Gorra</td>
														<td>
															<input type="text" className={(gorra?"":"is-invalid")+" form-control-lg form-control"} name="gorra" value={!gorra?"":gorra} onChange={this.changeinput}/>
														</td>
													</tr>
													<tr>
														<td className="text-right font-weight-bold">Calzado</td>
														<td>
															<input type="text" className={(calzado?"":"is-invalid")+" form-control-lg form-control"} name="calzado" value={!calzado?"":calzado} onChange={this.changeinput}/>
														</td>
													</tr>
													
													{type==="trabajador"?
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
						        </div>
						      
						      </div>
						    </form>
						  :null}
            </div>
            <div className="col-3">
              <button className="btn btn-outline-dark btn-block mb-1" onClick={()=>this.changeUniqueState({modal:true,type_modal:"addItem",modo:"create",idupdate:null})}>Incluir <i className="fa fa-plus"></i></button>
              
              <div className="input-group mb-1">
                <input type="text" autoComplete="off" className="form-control" name="q" value={q} onChange={this.onChange} placeholder="Buscar..."/>
                <div className="input-group-append">
                  <select className="custom-select" name="limit" onChange={this.onChange} value={limit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
              <div className="mb-1">
                <Cargando active={activeLoading}/>
                {!dataShow.length?
                  <span className="text-muted d-block text-center mt-2">¡Sin resultados! :(</span>
                :null}
              </div>
              <ul className="list-group text-primary mh-400">
                {dataShow.map((e,i)=>
                  i+1 <= limit ? 
                    <li className={(iditemselect==i?"bg-dark":"")+(" list-group-item")} key={e.id}>
                      <div 
                      className="hover pointer" 
                      onClick={()=>this.changeUniqueState({modal:true,type_modal:"detalles",iditemselect:i,idupdate:null})}>

                        <h5>{e.nombre}</h5>
                        <h5>{formatCedula(e.cedula)}</h5>

                      </div>

                      <div className="btn-group">
                        <button className="btn btn-info" data-index={i} onClick={this.edit}><i className="fa fa-pencil"></i></button>
                        <button className="btn btn-warning" data-id={e.id} onClick={this.remove}><i className="fa fa-trash"></i></button>
                      </div>
                    </li>
                  : null
                )}
              </ul>

            </div>
          </div>
          
				</div>
			</React.Fragment>

		);
	}
}

render(<App/>,document.getElementById('appreact'));