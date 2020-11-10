import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import {HeaderPersona} from './headerPersona';

import {handleNotification,Notification} from './handleNotification.jsx';




class App extends Component{
	constructor(){
		super()
		this.state = {
			controlEstudiosAcademico:{},
			admin:{},

			viewE:1,

			id_carrera:null,
		}
		this.loc = window.location.origin
		this.getApiData = this.getApiData.bind(this)

		this.changeState = this.changeState.bind(this)
		this.search = this.search.bind(this)



	}
	componentDidMount() {
		this.search()
		this.getApiData(null,"/controlEstudios/admin/show","admin")

	}
	changeState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}
	search(){
		axios.get("/controlEstudios/trayectos",{params:{}})
		.then(data=>{this.setState({controlEstudiosAcademico:data.data.porCarrera})})
		.catch(err=>{console.log(err)})
	}

	
	
	render(){
		let {
			admin,
			controlEstudiosAcademico,
			id_carrera
		} = this.state
		return(
			<div className="container-fluid">
				<div className="row mb-4">
					<div className="col">
						<HeaderPersona persona={admin}/>
					</div>	
				</div>
				<div className="row">
					<div className="col">
						<div className="border border-dark rounded p-3">
							{Object.entries(controlEstudiosAcademico).map((e,i)=>
								<button className="btn btn-secondary mb-2" key={i} onClick={()=>this.changeState({id_carrera:e[0]})}>{e[0]} ({Object.keys(e[1]).length})</button>
							)}
							<hr/>
							<h1>
								Estudiantes totales <span className="badge badge-secondary">
									{
										Object.values(controlEstudiosAcademico)
										.reduce( (total,obj) => {return total + Object.values(obj).length },0)
									}
								</span>
							</h1>
						</div>
					</div>
				</div>	
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));