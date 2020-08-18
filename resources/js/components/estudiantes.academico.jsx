import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import {handleNotification,Notification} from './handleNotification.jsx';
import {Headestudiante,Generalestudiante} from './estudiante/head.estudiante.jsx';
import Notasestudiante from './estudiante/estudiante.notas.jsx';




class App extends Component{
	constructor(){
		super()
		this.state = {
			estudiante:{},
			viewE:1,
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)

		this.changeState = this.changeState.bind(this)
		this.inscribir = this.inscribir.bind(this)



	}
	componentDidMount() {
		this.getApiData(null,"/estudiante/academicos","estudiante")


	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}

	inscribir(id){
		if (confirm("¿Realmente quiere inscribir la materia?")) {

			axios
			.put("/estudiante/academicos",{id:id,inscripcion:1})
			.then(data=>{
				handleNotification(data)
				this.getApiData(null,"/estudiante/academicos","estudiante")
			})
			.catch(error=>handleNotification(error))
		}
	}
	
	render(){
		let {estudiante,viewE} = this.state
		return(
			<div className="container-fluid">
				{Object.keys(estudiante).length?
					<React.Fragment>
						<Headestudiante estudiante={estudiante} loc={this.loc}/>
						
						<div className="btn-group mb-4 mt-4">
							<button className={"btn btn-"+(viewE===0?"success":"primary")} onClick={()=>this.changeState({viewE:0})}>General</button>
							<button className={"btn btn-"+(viewE===1?"success":"primary")} onClick={()=>this.changeState({viewE:1})}>Materias</button>
						</div>
						{viewE===0&&<Generalestudiante estudiante={estudiante} loc={this.loc}/>}
						{viewE===1&&<Notasestudiante estudiante={estudiante} inscribir={this.inscribir} />}
					</React.Fragment>
				:null}
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));