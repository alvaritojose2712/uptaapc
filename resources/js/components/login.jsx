import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import Cargando from './cargando';
import {handleNotification,Notification} from './handleNotification.jsx';

class App extends Component{
	constructor(){
		super()
		this.state = {
			pass:"",
			username:"",
			activeLoading:false,
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)

		this.submit = this.submit.bind(this)

	}
	componentDidMount() {

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
		.post("/iniciar",{
			pass: this.state.pass,
			username: this.state.username,
		})
		.then((data)=>{
			this.setState({
				activeLoading:false,
			});
			if (data.data&&data.data.estado) {
				setTimeout(function() {
					window.location = "/admin";
				},2000)
			}
			handleNotification(data)

		})
		.catch(error=>{handleNotification(error)})
	}
	
	
	render(){
		return(
			<div className="login">
				<Notification/>

				
				<div className="wrap-login100">
					<form className="login100-form validate-form" onSubmit={this.submit}>
						<div className="login100-form-logo">
							<img src={this.loc+"/images/uptaapc/logo1.png"} alt=""/>
						</div>

						<span className="login100-form-title pt-3 pb-3">
							Iniciar Sesión
						</span>

						<div className="wrap-input100 validate-input" data-validate = "Introduzca Usuario">
							<input className="input100" type="text" value={this.state.username} name="username" onChange={(event)=>this.changeUniqueState({username:event.target.value})} placeholder="Usuario" required/>
							<span className="focus-input100" data-placeholder="U"></span>
						</div>

						<div className="wrap-input100 validate-input" data-validate="Introduzca Contraseña">
							<input className="input100" type="password" value={this.state.pass} name="pass" onChange={(event)=>this.changeUniqueState({pass:event.target.value})} placeholder="Contraseña" required/>
							<span className="focus-input100" data-placeholder="C"></span>
						</div>

						<div className="container-login100-form-btn">
							<button className="login100-form-btn">
								Iniciar
							</button>
						</div>
						<Cargando active={this.state.activeLoading}/>
						
					</form>
				</div>
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));

