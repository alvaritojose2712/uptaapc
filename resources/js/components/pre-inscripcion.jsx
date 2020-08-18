import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import Cargando from './cargando';

import {handleNotification,Notification} from './handleNotification.jsx';


class App extends Component{
	constructor(){
		super()
		this.state = {
			user:{
				nombre:"",
				apellido:"",
				cedula:"",
				telefono_1:"",
				correo:"",
				password:"",
				carrera:"",
				prosecucion:0,

			},
			carreras:[],
			activeLoading:false,
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)
		this.changeInput = this.changeInput.bind(this)
		this.submit = this.submit.bind(this)

	}
	componentDidMount() {
		this.getApiData(null,"/controlEstudios/carreras","carreras")
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
		
		
		this.setState(st=>({
			user: {...st.user, [name]:(name==="file_cedula"||name==="file_foto")?files[0]:value}
		}));

	}

	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
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
		axios
		.post("/registro",this.state.user)
		.then((data)=>{
			this.setState({
				activeLoading:false,
			});
			if (data.data.estado) {
				setTimeout(function() {
					window.location = "/iniciar";
				},2000)
			}
			handleNotification(data)

		})
		.catch(error=>{handleNotification(error)})
	}
	
	
	render(){
		let {
			nombre,
			apellido,
			cedula,
			telefono_1,
			correo,
			password,
			carrera,
			prosecucion
		} = this.state.user
		let {carreras} = this.state
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
							Pre-Inscripción 
						</header>
						<Cargando active={this.state.activeLoading}/>

						<table className="table">
							<tbody>
								<tr>
									<td className="text-right font-weight-bold">Prosecución</td>
									<td className="">
										<select className="form-control" name="prosecucion" value={!prosecucion?"":prosecucion} onChange={this.changeInput} required>
											
											<option value="0">No</option>
											<option value="1">Sí</option>

							      </select>
									</td>
								</tr>

								<tr>
									<td className="text-right font-weight-bold">Carrera</td>
									<td className="">
										<select className="form-control" name="carrera" value={!carrera?"":carrera} onChange={this.changeInput} required>
											
											<option value="">-Seleccione-</option>
											{carreras.map(e=><option key={e.id} value={e.id}>{e.nombre} {e.proximamente==1?"*Próximamente*":null}</option>)}

							      </select>
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
									<td className="text-right font-weight-bold"><i className="fa fa-phone"></i> Teléfono 1</td>
									<td>
										<input type="text" className={(telefono_1?"":"is-invalid")+" form-control-lg form-control"} name="telefono_1" value={!telefono_1?"":telefono_1} onChange={this.changeInput} required/>
									</td>
								</tr>
								
								<tr>
									<td className="text-right font-weight-bold"><i className="fa fa-envelope"></i> Correo Electrónico</td>
									<td>
										<input type="text" className={(correo?"":"is-invalid")+" form-control-lg form-control"} name="correo" value={!correo?"":correo} onChange={this.changeInput} required/>
									</td>
								</tr>
								<tr>
									<td className="text-right font-weight-bold"><i className="fa fa-password"></i> Contraseña</td>
									<td>
										<input type="password" className={(password?"":"is-invalid")+" form-control-lg form-control"} name="password" value={!password?"":password} onChange={this.changeInput} required/>
									</td>
								</tr>
								
								

							</tbody>
						</table>
					</form>
				</div>
			</div>

		);
	}
}
render(<App/>,document.getElementById('appreact'));

