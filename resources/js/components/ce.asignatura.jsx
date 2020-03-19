import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';


// import Alert from 'react-s-alert';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component{
	constructor(){
		super()
		this.state = {
			carreras:[],
			profesores:[],
			carreras_id:null,
			categoria_id:null,
			uc_id:null,
			profesor_id:null,

			asignatura:[],
		}
		this.getApiData = this.getApiData.bind(this)
		this.delItem = this.delItem.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)

		this.sendReq = this.sendReq.bind(this)
		this.addAsignatura = this.addAsignatura.bind(this)

	}
	componentDidMount() {
		this.getApiData(null,"/controlEstudios/carreras","carreras")
		this.getApiData(null,"/controlEstudios/profesores","profesores")

		this.getApiData(null,"/controlEstudios/asignaturas","asignatura")
	}

	getApiData(e,url,prop){
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}

	delItem(id){
		if (this.state.asignatura[id].id) {
			axios
			.delete("/controlEstudios/asignaturas",{
				params:{id: this.state.asignatura[id].id}
			})
			.then(data=>{
				console.log(data)
				this.getApiData(null,"/controlEstudios/asignaturas","asignatura")

			})
			.catch(error=>{console.log(error);})
		}else{
			this.setState({asignatura:this.state.asignatura.filter((e,i)=>i!=id)})
		}
	}
	
	changeUniqueState(newState){
		return new Promise(solve=>this.setState(newState,solve))
	}
	
	sendReq(){
		axios
		.post("/controlEstudios/asignaturas",{
			asignatura: this.state.asignatura
		})
		.then(data=>{
			console.log(data)
				this.getApiData(null,"/controlEstudios/asignaturas","asignatura")

		})
		.catch(error=>{console.log(error);})
	}
	
	addAsignatura(){
		let {profesor_id,uc_id,carreras_id,categoria_id,profesores,carreras,asignatura} = this.state
		if (carreras_id!==null&&categoria_id!==null&&profesor_id!==null&&uc_id!==null) {
			let addProf = profesores[profesor_id]
			let addUc = carreras[carreras_id].categorias[categoria_id].ucs[uc_id]

			if (!asignatura.filter(e=>e.profesor.id===addProf.id&&e.uc.id===addUc.id).length) {
				this.setState(st=>({
					asignatura: st.asignatura.concat({profesor:addProf,uc:addUc})
				}));
			}
		}
	}
	render(){
		return(
			<div className="container-fluid">
				<div className="row">
					<div className="col">
						<div className="border border-dark rounded p-3 ">
						<h3>Unidades Curriculares</h3>
						{this.state.carreras_id!==null?
							<nav aria-label="breadcrumb">
							  <ol className="breadcrumb">
							  	{this.state.carreras_id!==null?<li className="breadcrumb-item active" aria-current="page">{this.state.carreras[this.state.carreras_id].nombre}</li>:null}
							  	{this.state.categoria_id!==null?<li className="breadcrumb-item active" aria-current="page">{this.state.carreras[this.state.carreras_id].categorias[this.state.categoria_id].nombre}</li>:null}
							  	{this.state.uc_id!==null?<li className="breadcrumb-item active" aria-current="page"><a href="#">{this.state.carreras[this.state.carreras_id].categorias[this.state.categoria_id].ucs[this.state.uc_id].nombre}</a></li>:null}
							    
							  </ol>
							</nav>
						:null}
						{this.state.carreras_id===null?
							<React.Fragment>
								<input type="text" onChange={e=>this.getApiData(e,"/controlEstudios/carreras","carreras")} placeholder="Buscar..." className="form-control mb-1"/>
								<ul className="list-group">
									{this.state.carreras.map((e,i)=><li key={i} onClick={()=>this.changeUniqueState({carreras_id:i})} className="hover list-group-item">
										{e.nombre}
									</li>)}
								</ul>
							</React.Fragment>
							:this.state.categoria_id===null?
							<React.Fragment>
								<i className="fa fa-arrow-left" onClick={()=>this.changeUniqueState({carreras_id:null})}></i>
								<ul className="list-group">
									{this.state.carreras[this.state.carreras_id].categorias.map((e,i)=><li key={i} onClick={()=>this.changeUniqueState({categoria_id:i})} className="hover list-group-item">
										{e.nombre}
									</li>)}
								</ul>
							</React.Fragment>:
							<React.Fragment>
								<i className="fa fa-arrow-left" onClick={()=>this.changeUniqueState({categoria_id:null,uc_id:null})}></i>
								<ul className="list-group">
									{this.state.carreras[this.state.carreras_id].categorias[this.state.categoria_id].ucs.map((e,i)=><li key={i} onClick={()=>{this.changeUniqueState({uc_id:i}).then(()=>this.addAsignatura())}} className="hover list-group-item">
										{e.nombre}
									</li>)}
								</ul>
							</React.Fragment>
						}
							
						</div>
					</div>
					<div className="col">

						<div className="rounded rounded p-3">
							<div className="d-flex justify-content-between align-items-end mb-2">
								<span className="h3">Asignaturas</span>
								<button className={(this.state.asignatura.filter(e=>!e.id).length?"btn-warning":"btn-primary")+" btn btn-circle btn-xl"} onClick={this.sendReq}><i className="fa fa-send"></i></button>
							</div>
							{this.state.asignatura.filter(e=>!e.id).length?<h5 className="text-center text-muted">¡Cambios sin guardar!</h5>:null}
							
							{this.state.asignatura.map((e,i)=>
								<div key={i} className="btn-group hover w-100 mb-1">
									<button className={(!e.id?"btn-warning":"btn-primary")+" btn"}>
										{e.profesor.nombres} {e.profesor.apellidos} {e.profesor.cedula}
									</button>
									<button className="btn btn-secondary">
										{e.uc.nombre}
									</button>
									<button className="btn btn-danger" onClick={()=>this.delItem(i)}><i className="fa fa-times"></i></button>
								</div>
							)}
							{!this.state.asignatura.length&&<h4 className="text-center mt-3">¡Sin asignaturas!</h4>}
						</div>
					</div>
					<div className="col">

						<div className="rounded border border-dark rounded p-3">
						<h3>Profesores</h3>
							<React.Fragment>
								<input type="text" onChange={e=>this.getApiData(e,"/controlEstudios/profesores","profesores")} placeholder="Buscar..." className="form-control mb-1"/>
								<ul className="list-group">
									{this.state.profesores.map((e,i)=><li key={i} onClick={()=>{this.changeUniqueState({"profesor_id":i}).then(()=>this.addAsignatura())}} className="hover list-group-item">
										{e.nombres} {e.apellidos} {e.cedula}
									</li>)}
								</ul>
							</React.Fragment>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));