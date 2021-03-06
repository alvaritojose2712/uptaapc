import React, {Component} from 'react';
import Cargando from '../../../../assets/cargando';

import {formatPartida,retDivisa,formatMoneda,inputMoneda,removeMoneda} from '../../../../assets/custom';
import {handleNotification,Notification} from '../../../../assets/handleNotification.jsx';

const controller = "/presupuesto/presupuesto_ordinario"
const nameProp = "PresupuestoOrdinario" //Array All records

const propsController = (igual) => {
  return {
    denominacion: igual.denominacion,
    monto: igual.monto,
    partida: igual.partida,
    ae: igual.ae,
    fecha: igual.fecha,
  }
}
const searchKeys = ["denominacion","partida"]

const searchParams = (q,e) => {
  let ret = false
  searchKeys.map(key=>{
    if (e[key].toString().toLowerCase().startsWith(q.toLowerCase())) ret = true
  })

  return ret
}


export default class App extends Component{
	constructor(){
		super()
		this.state = {
			activeLoading: false,
			[nameProp]:[],
      iditemselect:null,
      
			modal:false,
      type_modal:"",
      
      q:"",
      limit:"10",

      modo:"create", //create || update
      idupdate:null,

      optionsPartida: [],
      optionsAe: [],
			
			denominacion:"",
      monto:"",
      partida:"",
      ae:"",
      fecha:"",
		}
		this.loc = window.location.origin+"/"
		this.getApiData = this.getApiData.bind(this)
		this.changeUniqueState = this.changeUniqueState.bind(this)

		this.submit = this.submit.bind(this)
		this.onChange = this.onChange.bind(this)
		this.closeModal = this.closeModal.bind(this)
		this.remove = this.remove.bind(this)
		this.search = this.search.bind(this)
		this.edit = this.edit.bind(this)

	}
	componentDidMount() {
	  // const partidaId = new URLSearchParams(window.location.search).get('partida');
    this.getApiData(null,controller,nameProp)

    this.getApiData(null,"/presupuesto/partidas","optionsPartida")
	  this.getApiData(null,"/presupuesto/acciones_especificas","optionsAe")
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
  search(event=null){this.getApiData(event,controller,nameProp)}
	
  remove(e){
    if(confirm("¿Seguro de eliminar?")){

      this.setState({activeLoading:true});

      const objSend = {
        id: e.currentTarget.attributes["data-id"].value,
        modo: "delete"
      }

      axios
      .post(controller,objSend)
      .then((data)=>{
        this.setState({activeLoading:false,idupdate:null,iditemselect:null});
        handleNotification(data)
        this.search()
      })
    }
  }
	submit(event){
		event.preventDefault()
		this.setState({activeLoading:true});
		
    const objSend = propsController(this.state)

    objSend.modo = this.state.modo
    objSend.idupdate = this.state.idupdate

    objSend.monto = removeMoneda(this.state.monto)

		axios
		.post(controller,objSend)
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
    let obj = propsController(h)
    obj.monto = formatMoneda(obj.monto)
    this.setState(st=>(obj));
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

      optionsPartida,
      optionsAe,

			denominacion,
      monto,
      partida,
      ae,
      fecha,

		} = this.state

	  let dataShow = this.state[nameProp].filter(e=> (q==="") || (q!=="" && searchParams(q,e)) )

		return(
			<React.Fragment>
				<Notification/>
				<div className="container-fluid">
          <div className="row">
            <div className="col">
              <h4 className="text-center">Presupuesto</h4>
              <h1 className="text-center">Ordinario</h1>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {type_modal==="detalles"?
                <div className="detalles">
                    
                  {iditemselect!==null&&dataShow[iditemselect]?
                  <table className="table">
                    <tbody>

                      <tr>
                        <td>Denominación</td>
                        <th>{dataShow[iditemselect].denominacion}</th>
                      </tr>
                      <tr>
                        <td>Partida</td>
                        <th>{formatPartida(dataShow[iditemselect].partida)}</th>
                      </tr>
                      <tr>
                        <td>Acción específica</td>
                        <th>{dataShow[iditemselect].ae}</th>
                      </tr>
                      
                      <tr>
                        <td>Monto</td>
                        <th className="text-success h4">{formatMoneda(dataShow[iditemselect].monto)}</th>
                      </tr>

                      <tr>
                        <td>Fecha</td>
                        <th>{dataShow[iditemselect].fecha}</th>
                      </tr>

                      


                    </tbody>  
                  </table>
                  :null}
                </div>
              :null}
              {type_modal==="addItem"?
                <div className="">
                  <div className="d-flex justify-content-center align-items-center flex-column">
                    
                  </div>
                  <div className={"border"}>
                    {modo==="update"&&<h1 className="text-right">Editando: {idupdate}</h1>}
                    <div className="mt-5">
                      <form  onSubmit={this.submit}>
                    
                      <table className="table table-borderless">
                        <tbody>
                          
  												<tr>
                            <td className="text-right font-weight-bold">Denominación</td>
                            <td className="">
                              <input type="text" className={(denominacion?"":"is-invalid")+" form-control-lg form-control"} placeholder="Aquí Código..." name="denominacion" value={!denominacion?"":denominacion} onChange={this.onChange} required/>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-right font-weight-bold">Partida</td>
                            <td className="">
                              <select className={(partida?"":"is-invalid")+" form-control-lg form-control"} value={!partida?"":partida} name="partida" onChange={this.onChange} required>
                                <option value="">----</option>
                                {optionsPartida.map(e=>

                                  <option key={e.id} value={e.codigo}>{formatPartida(e.codigo)} | {e.partida}</option>
                                )}

                              </select>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-right font-weight-bold">Acción específica</td>
                            <td className="">

                              <select className={(ae?"":"is-invalid")+" form-control-lg form-control"} value={!ae?"":ae} name="ae" onChange={this.onChange} required>
                                <option value="">----</option>
                                {optionsAe.map(e=>

                                  <option key={e.id} value={e.id}>{e.nombre}</option>
                                )}

                              </select>
                            </td>
                          </tr>

                          <tr>
                            <td className="text-right font-weight-bold">Monto</td>
                            <td className="">
                              <input type="text" className={(monto?"":"is-invalid")+" form-control-lg form-control"} placeholder="Aquí monto..." name="monto" value={!monto?"":monto} onChange={this.onChange} required/>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-right font-weight-bold">Fecha</td>
                            <td className="">
                              <input type="date" className={(fecha?"":"is-invalid")+" form-control-lg form-control"} name="fecha" value={!fecha?"":fecha} onChange={this.onChange} required/>
                            </td>
                          </tr>


  												<tr>
                            <td></td>
                            <td>
                              <div className="btn-group">
                                <button className={(modo==="update"?"btn-warning":"btn-success")+(" btn btn-block")} type="submit">
                                    {(modo==="update"?"Actualizar registro ("+idupdate+")":"Registrar")}
                                    
                                </button>
                                  {(modo==="update"?
                                    <button className="btn btn-sm btn-danger" onClick={()=>this.changeUniqueState({iditemselect:null, idupdate:null,modo:"registrar"})}><i className="fa fa-times"></i></button>
                                    :null)}
                              </div>
                            </td>
                          </tr>
                         
                        </tbody>
                      </table>
                    </form>
                    </div>
                  
                  </div>
                </div>
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

                        <h6 className="text-muted text-right">{e.fecha}</h6>
                        <h5>{e.denominacion}</h5>
                        <h5>{formatMoneda(e.monto)}</h5>

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
