import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

import Flotante from './Flotante';
// import Alert from 'react-s-alert';
// import 'react-s-alert/dist/s-alert-default.css';
// import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class App extends Component{
	constructor(){
		super()
		this.state = {
			view:0,
			campos:[],
			flotanteHide:true,
			InpCondiPe:0,
			forVersiId:null,
			selectFormAdicPers:null,
			personas:[],
			ut:[],
			formulas:[],
			divisiones:[],
			sueldos:[],
			idSueldo:null,

			inputDenominacionNomina:"",
			selectNomPeri:"Mensual",

			condicionesPersona: [],
			selectPersona:[],
			formulasSelect:[],

			sueldosSelect:[],
			utSelect:[],
			incluir_excluir:1,
		}
		this.loc = window.location.pathname.split("/")
		this.addCondiPer = this.addCondiPer.bind(this)
		this.getApiData = this.getApiData.bind(this)
		this.selectPersona = this.selectPersona.bind(this)
		this.delItem = this.delItem.bind(this)
		this.hideFlotante = this.hideFlotante.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)
		this.addFormula = this.addFormula.bind(this)
		this.changeDiviFor = this.changeDiviFor.bind(this)

		this.selectPersonaAdicFor = this.selectPersonaAdicFor.bind(this)
		this.selectPersonaOpenFlotante = this.selectPersonaOpenFlotante.bind(this)
		this.toggleSelects = this.toggleSelects.bind(this)
		this.sendReq = this.sendReq.bind(this)
		this.toggleProp = this.toggleProp.bind(this)
		this.saveNom = this.saveNom.bind(this)
		this.getDataNomForUpd = this.getDataNomForUpd.bind(this)

	}
	componentDidMount() {
	  this.getApiData(null,"/config/valores","campos")
		this.getApiData(null,"/rrhh/formulas","formulas")
		this.getApiData(null,"/config/divisiones","divisiones")
		this.getApiData(null,"/rrhh/sueldos","sueldos")
		this.getApiData(null,"/rrhh/ut","ut")

		if (this.loc.indexOf("rrhh")!==-1&&this.loc.indexOf("nomina")!==-1&&this.loc.indexOf("config")!==-1) {
			this.getDataNomForUpd()
		}
	}
	addCondiPer(){
		let adding = this.state.campos[this.state.InpCondiPe];
		if (!adding) {adding = this.state.campos[0];}
		if(!this.state.condicionesPersona.filter(e=>JSON.stringify(e)===JSON.stringify(adding)).length){
			this.setState(st=>({condicionesPersona:st.condicionesPersona.concat(adding)}))
		}
	}
	getApiData(e,url,prop){
		if (prop=="personas") {this.setState({flotanteHide:false})}
		if (prop=="formulas") {this.setState({forVersiId:null})}
		if (prop=="sueldos") {this.setState({idSueldo:null})}
		axios.get(url,{params:{q:e?e.target.value:""}})
		.then(data=>{this.setState({[prop]:data.data})})
		.catch(err=>{console.log(err)})
	}
	selectPersona(i){
		let adding = this.state.personas[i];
		if(!this.state.selectPersona.filter(e=>JSON.stringify(e)===JSON.stringify(adding)).length){
			this.setState(st=>({flotanteHide:true,selectPersona:st.selectPersona.concat(adding)}))
		}
	}
	delItem(id,prop){
		if (prop=="deladipersofor") {
			let formulasSelectNew = this.state.formulasSelect
			formulasSelectNew[id.formula].solo = formulasSelectNew[id.formula].solo.filter((e,i)=>i!=id.id)
			this.setState({formulasSelect:formulasSelectNew})
		}else{
			this.setState({[prop]:this.state[prop].filter((e,i)=>i!=id)})
		}
	}
	hideFlotante(){
		this.setState({flotanteHide:true})
	}
	changeUniqueState(prop,val){
		this.setState({[prop]:val})
	}
	addFormula(id){
		let adding = this.state.formulas[this.state.forVersiId].versiones[id];
		adding.divisiones = [this.state.divisiones[3],this.state.divisiones[4]]
		adding.solo = []
		if(!this.state.formulasSelect.filter(e=>e.id===adding.id).length){
			this.setState(st=>({formulasSelect:st.formulasSelect.concat(adding)}))
		}
	}
	changeDiviFor(id,type){

		let formulasSelectNew = this.state.formulasSelect;
		const fun = id => {
			let d = this.state.divisiones;
			let idLast = formulasSelectNew[id].divisiones[formulasSelectNew[id].divisiones.length-1].id
			let arr;
				switch(idLast){
					case 1:
						arr = type==="mas"?[d[1]]:[d[0]]
						formulasSelectNew[id].divisiones = arr
					break;
					case 2:
						arr = type==="mas"?[d[2]]:[d[0]]
						formulasSelectNew[id].divisiones = arr
					break;
					case 3:
						arr = type==="mas"?[d[3],d[4]]:[d[1]]
						formulasSelectNew[id].divisiones = arr
					break;
					case 5:
						arr = type==="mas"?[d[5],d[6],d[7],d[8]]:[d[2]]
						formulasSelectNew[id].divisiones = arr
					break;
					case 9:
						arr = type==="mas"?[d[5],d[6],d[7],d[8]]:[d[3],d[4]]
						formulasSelectNew[id].divisiones = arr
					break;
				}
			return formulasSelectNew;
		}
		if (id===null) {
			formulasSelectNew.map((e,i)=>{
				this.setState({
					formulasSelect:fun(i)
				});
			})
		}else{
			this.setState({
				formulasSelect:fun(id)
			});
		}

	}
	selectPersonaAdicFor(i){
		let adding = this.state.personas[i].cedula;
		if (this.state.formulasSelect[this.state.selectFormAdicPers].solo.indexOf(adding)==-1) {

			this.setState(st=>{
				formulasSelect:st.formulasSelect[st.selectFormAdicPers].solo.push(adding)
			});
		}

	}
	selectPersonaOpenFlotante(i){
		this.getApiData(null,"/rrhh/personal","personas")
		this.setState({
			selectFormAdicPers:i 
		});
	}
	toggleSelects(i,prop){
		let adding = this.state[prop.api][i]
		if (this.state[prop.select].filter((e,i)=>JSON.stringify(e)==JSON.stringify(adding)).length) {
			this.setState(st=>({[prop.select]:st[prop.select].filter((e,i)=>JSON.stringify(e)!=JSON.stringify(adding))}))
		}else{
			this.setState(st=>({[prop.select]:st[prop.select].concat(adding)}))
		}
	}
	toggleProp(prop,val1,val2){
		if (this.state[prop]==val1) {
			this.setState({
				[prop]:val2 
			});
		}else{
			this.setState({
				[prop]:val1 
			});
		}
	}
	sendReq(){
		if (this.loc.indexOf("rrhh")!==-1&&this.loc.indexOf("nomina")!==-1&&this.loc.indexOf("crear")!==-1) {
			this.saveNom("/rrhh/nomina/crear")
			console.log("crear")
		}else{
			this.saveNom("/rrhh/nomina/actualizar",this.loc[this.loc.length-1])
			console.log("actualizar")
		}
	}
	saveNom(url,id_nomina=null){
		// if (window.confirm("¿Seguro de crear nueva nómina?")) {
				axios
				.post(url,{
					condicionesPersona: this.state.condicionesPersona,
					selectPersona: this.state.selectPersona,
					formulasSelect: this.state.formulasSelect,
					sueldosSelect: this.state.sueldosSelect,
					utSelect: this.state.utSelect,

					inputDenominacionNomina: this.state.inputDenominacionNomina,
					selectNomPeri: this.state.selectNomPeri,
					incluir_excluir:this.state.incluir_excluir,

					id_nomina:id_nomina,
				})
				.then(data=>{console.log(data)})
				.catch(error=>{console.log(error);})
			// }
	}
	getDataNomForUpd(){
		axios
			.get("/rrhh/nomina/getParametersNomina",{params:{id_nomina:this.loc[this.loc.length-1]}})
			.then(data=>{
				let d = data.data
				
				this.setState({
					incluir_excluir:d.nomina.adic_personal.map(e=>e.incluir_excluir).length?d.nomina.adic_personal.map(e=>e.incluir_excluir)[0]:1,
					selectPersona:d.PersonalAdicional,
					condicionesPersona:d.nomina.condiciones.map(e=>e.valorall),
					inputDenominacionNomina:d.nomina.denominacion,
					selectNomPeri:d.nomina.periodo,
					sueldosSelect:d.TablaSueldo.map((e,i)=>e.tabla),
					utSelect:d.returnUt.map((e,i)=>e.tabla),
					formulasSelect: d.returnFormuAsig.map(e=>e.formula).map(e=>{
						e.divisiones = d.divisionesFormulas.filter(ee=>ee.id_formula===e.id).map(e=>e.division)
						e.solo = d.adic_formula.filter(ee=>ee.id_formula===e.id).map(e=>e.cedula)
						return e
					}),
				});
			})
	}
	render(){
		return(
			<div className="container-fluid">
				<div className="form-group text-center">
					<select onChange={e=>this.changeUniqueState("selectNomPeri",e.target.value)} value={this.state.selectNomPeri} className="selectempty">
						<option value="Mensual">Mensual</option>
						<option value="Anual">Anual</option>
					</select>
				</div>
				<div className="form-group">
					<input type="text" placeholder="Nombre de la nómina" 
					value={this.state.inputDenominacionNomina} 
					onChange={e=>this.changeUniqueState("inputDenominacionNomina",e.target.value)} 
					className="inputempty"/>
				</div>
				<div className="text-center mb-3">
					<div className="">
						<button className={(this.state.view===0?"btn-success":"btn-primary")+" mr-2 btn btn-circle btn-xl"} onClick={()=>this.changeUniqueState("view",0)}><i className="fa fa-users"></i></button>
						<button className={(this.state.view===1?"btn-success":"btn-primary")+" mr-2 btn btn-circle btn-xl"} onClick={()=>this.changeUniqueState("view",1)}><i className="fa fa-calculator"></i></button>
						<button className={(this.state.view===2?"btn-success":"btn-primary")+" mr-2 btn btn-circle btn-xl"} onClick={()=>this.changeUniqueState("view",2)}><i className="fa fa-list-alt"></i></button>
						<button className={(this.state.view===3?"btn-success":"btn-primary")+" mr-2 btn btn-circle btn-xl"} onClick={()=>this.changeUniqueState("view",3)}><i className="fa fa-usd"></i></button>
						<button className="btn-warning ml-4 btn btn-circle btn-xl" onClick={this.sendReq}><i className="fa fa-send"></i></button>
					</div>
				</div>
				{this.state.view===0?
				<React.Fragment>
					<h3 className="card-title">Personal</h3>
					<div className="row">
						<div className="col">
							<div className="card">
								<div className="card-body">
									<table className="table table-sm table-borderless">
										<tbody>
											
											<tr>
												<td><h4>Condicionar personal</h4></td>
												<td>
													<div className="input-group mb-3">
														<input type="text" className="form-control" placeholder="Buscar..." onChange={(e)=>this.getApiData(e,"/config/valores","campos")}/>
													  <select className="form-control" value={this.state.InpCondiPe} onChange={e=>this.changeUniqueState("InpCondiPe",e.target.value)}>
													  		<option disabled>-Seleccione-</option>
														{this.state.campos.map((e,i)=>
															<option key={i} value={i}>{e.valor} | {e.campo}</option>
														)}
													  </select>
													  <div className="input-group-append">
													    <button disabled={this.state.InpCondiPe===null||!this.state.campos.length?true:false} onClick={this.addCondiPer} className="btn btn-outline-primary" type="button"><i className="fa fa-plus"></i></button>
													  </div>
													</div>
												</td>
											</tr>
											<tr>
												<td colSpan="2">
													{
														this.state.condicionesPersona.map((e,i)=>

															<div className="btn-group m-2" key={i} onClick={()=>this.delItem(i,"condicionesPersona")}>
																<button className="btn btn-secondary">{e.valor}</button>
																<button className="btn btn-primary">{e.campo}</button>
															</div>
														)
													}
				
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="col">
							<div className={(this.state.incluir_excluir?"alert-success":"alert-danger")+" card"}>
								<div className="card-body">
									<table className="table table-sm table-borderless">
										<tbody>
											<tr>
												<td colSpan="2">
												{this.state.incluir_excluir?"Incluir":"Excluir"}
													<div className="switch colored" onClick={()=>this.toggleProp("incluir_excluir",1,0)}>
													  	<input type="checkbox" checked={this.state.incluir_excluir?true:false} onChange={e=>this.changeUniqueState("incluir_excluir",e.target.checked)}/>
													 		<label></label>
													</div>
												</td>
											</tr>
											<tr>
												<td><h4>Personal adicional</h4></td>
												<td>
													<div className="input-group mb-3">
													  <input type="text" onFocus={(e)=>this.getApiData(e,"/rrhh/personal","personas")} placeholder="Buscar..." className="form-control" onChange={(e)=>this.getApiData(e,"/rrhh/personal","personas")} />
													  <div className="input-group-append">
													    <button className={(this.state.incluir_excluir?"btn-outline-success":"btn-outline-danger")+" btn"} type="button"><i className="fa fa-search"></i></button>
													  </div>
													</div>
													
													<Flotante handleClickSelect={this.selectPersona} personas={this.state.personas} flotanteHide={this.state.flotanteHide} handleClick={this.hideFlotante}/>

													
												</td>
											</tr>
											<tr>
												<td colSpan="2">
												{
													this.state.selectPersona.map((e,i)=>

														<div className="btn-group m-2" key={i} onClick={()=>this.delItem(i,"selectPersona")}>
															<button className="btn btn-secondary">{e.cedula}</button>
															<button className={(this.state.incluir_excluir?"btn-success":"btn-danger")+" btn"}>{e.apellido}</button>
														</div>
													)
												}
												</td>
												
											</tr>
											

										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</React.Fragment>:null
				}
				{this.state.view===1?
				<React.Fragment>
					<h3 className="card-title">Fórmulas</h3>
					<div className="row">
						<div className="col">
							<div className="input-group">
							  <div className="input-group-prepend">
							    <span className="input-group-text">Fórmula</span>
							  </div>
							  <input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/rrhh/formulas","formulas")} className="form-control"/>
							 
							</div>
							<table className="table table-borderless">
								<thead>
									<tr>
										<th>ID</th>
										<th>Descripción</th>
										<th>Tipo Movimiento</th>
										<th>Partida</th>
									</tr>
								</thead>
								<tbody>
									{this.state.formulas.map((e,i)=>
										<tr key={i} className={this.state.forVersiId===i?"hover table-primary":"hover"} onClick={()=>this.changeUniqueState("forVersiId",i)}>
											<td>{e.id}</td>		
											<td>{e.descripcion}</td>		
											<td>{e.movimiento}</td>		
											<td>{e.partida}</td>		
										</tr>
									)}
								</tbody>
							</table>
						</div>
						{this.state.forVersiId!==null?
							<div className="col">
								<table className="table table-bordered">
									<thead>
										<tr><td colSpan="3"><h4>{this.state.formulas[this.state.forVersiId].descripcion}</h4></td></tr>
										<tr><td colSpan="3">
										<h3>Condiciones</h3>
										<table className="table  table-borderless table-sm">
											<tbody>
											{this.state.formulas[this.state.forVersiId].condiciones.map((e,i)=>
												<tr key={i}>
													<td><button className="btn btn-block">{e.type==0?e.valorall.campo:e.campo}</button></td>
													<td><button className="btn btn-block btn-success">{e.operador}</button></td>
													<td><button className="btn btn-block btn-primary">{e.valor}</button></td>
												</tr>
											)}
											</tbody>
										</table>
										</td></tr>
										<tr>
											<th>Fórmula</th>
											<th>Fórmula Aporte</th>
											<th>Fecha</th>
										</tr>
									</thead>
									<tbody>
										{this.state.formulas[this.state.forVersiId].versiones.map((e,i)=>
											<tr key={i} className="hover" onClick={()=>this.addFormula(i)}>
												<td>{e.formula}</td>
												<td>{e.formula_aporte}</td>
												<td className="text-success">{e.fecha}</td>
											</tr>
										)}
										
									</tbody>
								</table>
							</div>
						:null}
						{this.state.formulasSelect.length?
								<div className="col">
								<h4>Fórmulas seleccionadas
									<div className="btn-group pull-right">
										<button className="btn btn-secondary" onClick={()=>this.changeDiviFor(null,"menos")}>
											<i className="fa fa-minus"></i>
										</button>
										<button className="btn btn-secondary" onClick={()=>this.changeDiviFor(null,"mas")}>
											<i className="fa fa-plus"></i>
										</button>
									</div>
								</h4>
								<input type="text" onFocus={(e)=>this.getApiData(e,"/rrhh/personal","personas")} placeholder="Buscar personal adicional..." className="form-control" onChange={(e)=>this.getApiData(e,"/rrhh/personal","personas")} />
								<Flotante handleClickSelect={this.selectPersonaAdicFor} personas={this.state.personas} flotanteHide={this.state.flotanteHide} handleClick={this.hideFlotante}/>
									<table className="table table-sm table-borderless">
										<thead>
											{
												this.state.formulasSelect.map((e,i)=>
													<React.Fragment key={i}>
														<tr title={e.formula+"\n"+e.formula_aporte+"\n"+e.denominacion.movimiento+"\n"+e.denominacion.partida}>
															<th onClick={()=>this.delItem(i,"formulasSelect")} className="hover">
																<div className="btn-group w-100">
																	<button className="btn btn-success">{e.denominacion.descripcion}</button>
																	<button className="btn btn-success">{e.fecha}</button>
																</div><br/>
																<div className="btn-group w-100">
																{e.divisiones?
																	e.divisiones.map((ee,ii)=>
																		<button key={ii} className="btn btn-primary">
																			{ee.denominacion}<br/>
																			{ee.porcentaje}
																		</button>
																		
																	)
																:null}
																</div>
															</th>
															<th>
															<button className="btn" onClick={()=>this.selectPersonaOpenFlotante(i)}>
																<i className="fa fa-users"></i>
															</button><br/>
																<div className="btn-group">
																	<button className="btn btn-danger" onClick={()=>this.changeDiviFor(i,"menos")}>
																		<i className="fa fa-minus"></i>
																	</button>
																	<button className="btn btn-primary" onClick={()=>this.changeDiviFor(i,"mas")}>
																		<i className="fa fa-plus"></i>
																	</button>
																</div>
															</th>
														</tr>
														<tr>
															<td>
																<ul className="list-group">
																{
																	e.solo.map((ee,ii)=>
																		<li onClick={()=>this.delItem({id:ii,formula:i},"deladipersofor")} className="hover list-group-item" key={ii}>{ee}</li>
																	)
																}
																</ul>
															</td>
														</tr>
													</React.Fragment>
												)
											}	
										</thead>
									</table>
								</div>
						:null}
					</div>
				</React.Fragment>:null
				}
				{this.state.view===2?
				<React.Fragment>
					<h3 className="card-title">Sueldos</h3>
					<div className="row">
						<div className="col-md-4">
					  <div className="input-group">
							  <div className="input-group-prepend">
						    <span className="input-group-text">Tabla</span>
							  </div>
					  		<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/rrhh/sueldos","sueldos")} className="form-control"/>
							</div>
							<table className="table table-borderless">
								<thead>
									<tr>
										<th>ID</th>
										<th>Descripción</th>
										<th>Fecha</th>
									</tr>
								</thead>
								<tbody>
									{this.state.sueldos.map((e,i)=>
										<tr key={i} className={this.state.sueldosSelect.filter(ee=>ee.id===e.id).length?"hover table-success":"hover"} onClick={()=>{this.toggleSelects(i,{api:"sueldos",select:"sueldosSelect"});this.changeUniqueState("idSueldo",i)}}>
											<td>{e.id}</td>		
											<td>{e.descripcion}</td>		
											<td>{e.fecha}</td>		
											{this.state.idSueldo==i?<td><i className="fa fa-eye fa-2x"></i></td>:null}
										</tr>
									)}
								</tbody>
							</table>
						</div>
						{this.state.idSueldo!==null?
						<div className="col-md-4">
							<h3>{this.state.sueldos[this.state.idSueldo].descripcion}</h3>
							<table className="table table-borderless table-sm">
								<thead>
									<tr>
										<th>ID</th>
										<th>Categoría</th>
										<th>Cargo</th>
										<th>Dedicación</th>
										<th>Salario</th>
									</tr>
								</thead>
								<tbody>
									{this.state.sueldos[this.state.idSueldo].sueldos.map((e,i)=>
									
									<tr key={i}>
										<td>{e.id}</td>
										<td>{e.categoria}</td>
										<td>{e.cargo}</td>
										<td>{e.dedicacion}</td>
										<td>{e.salario}</td>
									</tr>
								)}
								</tbody>
							</table>
						</div>
							:null}
							{this.state.sueldosSelect.length?

								<div className="col-md-4">
									<h3>Tablas seleccionadas</h3>
									<ul className="list-group">
										{this.state.sueldosSelect.map((e,i)=>
												<li onClick={()=>this.delItem(i,"sueldosSelect")} className="list-group-item hover" key={i}>{e.descripcion}</li>
											)}
									</ul>
								</div>
								:null}
					</div>
				</React.Fragment>:null
				}
				{this.state.view===3?
				<React.Fragment>
					<h3 className="card-title">Unidad Tributaria</h3>
					<div className="row">
						<div className="col-md-6">
					  <div className="input-group">
							  <div className="input-group-prepend">
						    <span className="input-group-text">UT</span>
							  </div>
					  		<input type="text" placeholder="Buscar..." onChange={e=>this.getApiData(e,"/rrhh/ut","ut")} className="form-control"/>
							</div>
							<table className="table table-borderless">
								<thead>
									<tr>
										<th>ID</th>
										<th>Valor</th>
										<th>Fecha</th>
									</tr>
								</thead>
								<tbody>
									{this.state.ut.map((e,i)=>
										<tr key={i} className={this.state.utSelect.filter(ee=>ee.id===e.id).length?"hover table-success":"hover"} onClick={()=>{this.toggleSelects(i,{api:"ut",select:"utSelect"})}}>
											<td>{e.id}</td>		
											<td>{e.valor}</td>		
											<td>{e.fecha}</td>		
										</tr>
									)}
								</tbody>
							</table>
						</div>
						<div className="col-md-6">
							<h3>UT seleccionadas</h3>
							<ul className="list-group">
								{this.state.utSelect.map((e,i)=>
									<li key={i} className="list-group-item hover" onClick={()=>this.delItem(i,"utSelect")}>{e.valor} | {e.fecha}</li>
								)}
							</ul>
						</div>
					</div>
				</React.Fragment>:null
				}
			</div>
		);
	}
}
render(<App/>,document.getElementById('appreact'));