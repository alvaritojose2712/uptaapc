import React, {Component} from 'react';
import Cargando from '../../../../assets/cargando';

import {formatPartida,retDivisa,removePartida,getTodayDate} from '../../../../assets/custom';
import {handleNotification,Notification} from '../../../../assets/handleNotification.jsx';

const controller = "/presupuesto/partidas"
const nameProp = "partidas" //Array All records

const propsController = (igual) => {
  return {
    partida: igual.partida,
    codigo: igual.codigo,
    descripcion: igual.descripcion
  }
}
const searchKeys = ["codigo","partida"]

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

			
			codigo:"",
			partida:"",
			descripcion:"",
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
		this.setState({[name]: value });
	};
	
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
  search(event=null){this.getApiData(event,controller,nameProp)}
	submit(event){
		event.preventDefault()
		this.setState({activeLoading:true});
		
    const objSend = propsController(this.state)

    objSend.modo = this.state.modo
    objSend.idupdate = this.state.idupdate

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
    this.setState(st=>(propsController(h)));
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

			codigo,
			partida,
			descripcion,

		} = this.state

	  let dataShow = this.state[nameProp].filter(e=> (q==="") || (q!=="" && searchParams(q,e)) )

		return(
			<React.Fragment>
				<Notification/>
				<div className="container-fluid">
          <div className="row">
            <div className="col">
              <h4 className="text-center">Partidas</h4>
              <h1 className="text-center">presupuestarias</h1>
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
                        <td>Código</td>
                        <th>{formatPartida(dataShow[iditemselect].codigo)}</th>
                      </tr>
                      <tr>
                        <td>Partida</td>
                        <th>{dataShow[iditemselect].partida}</th>
                      </tr>
                      <tr>
                        <td>Descripción</td>
                        <th>{dataShow[iditemselect].descripcion}</th>
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
                            <td className="text-right font-weight-bold">Código</td>
                            <td className="">
                              <input type="text" className={(codigo?"":"is-invalid")+" form-control-lg form-control"} placeholder="Aquí Código..." name="codigo" value={!codigo?"":codigo} onChange={this.onChange} required/>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-right font-weight-bold">Partida</td>
                            <td className="">
                              <input type="text" className={(partida?"":"is-invalid")+" form-control-lg form-control"} placeholder="Aquí Partida..." name="partida" value={!partida?"":partida} onChange={this.onChange} required/>
                            </td>
                          </tr>
                          <tr>
                            <td className="text-right font-weight-bold">Descripción</td>
                            <td className="">
                              <input type="text" className={(descripcion?"":"is-invalid")+" form-control-lg form-control"} placeholder="Aquí Descripción..." name="descripcion" value={!descripcion?"":descripcion} onChange={this.onChange} required/>
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

                        <h5>{formatPartida(e.codigo)}</h5>
                        <h5>{e.partida}</h5>

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
