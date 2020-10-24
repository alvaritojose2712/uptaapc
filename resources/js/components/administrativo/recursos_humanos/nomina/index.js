import React, { Component } from 'react'
import {mostrarNominas,infoNominaFun} from './actions/nominaActions';
import {connect} from 'react-redux';
import {formatCedula} from '../../../../assets/custom';
import Modal from 'react-responsive-modal';
import Recibo from './recibo';
import Nominaconfig from './nominaconfig';
import { Link } from 'react-router-dom';
class Nominas extends Component {
  constructor(){
    super();
		this.state = {
      idNomina:null,
      idRecibo:null,
			cargando:true,
			open:false,
			dataModal:{
				type:"",
				obj:{}
			}
		}
    this.onCloseModal = this.onCloseModal.bind(this)
		this.onOpenModal = this.onOpenModal.bind(this)
		this.verInfoNomina = this.verInfoNomina.bind(this)
  }
  componentWillMount(){
    this.props.mostrarNominas()
  }
  onOpenModal(id) {
		this.setState({ open: true, idRecibo:id });
	};
	 
	onCloseModal(){
		this.setState({ open: false });
  };
  verInfoNomina(id){
    let val = id
    if(this.state.idNomina!==null&&this.state.idNomina===val) val=null
    this.setState({idNomina:val})
    this.props.infoNominaFun(id)
  }
  
  render() {
    const {nomina} = this.props.nomina
    return (
      <div>
        <nominaconfig />
					{/* <Route path='/recursoshumanos/nominas/:id?' component={()=>alert("hola mundo")}/> */}

          {/* {
            open
            &&
            <Modal open={open} onClose={this.onCloseModal}>
              {
                this.state.idRecibo!==null
                ?<Recibo data={this.state.idRecibo}/>
                :null
              }
              
            </Modal>
            
          } */}
          <div className="row">
            <div className="col bg-light">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Denominación</th>
                    <th>Período</th>
                    <th>Fecha</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                    nomina.map((e,i)=>
                    <tr key={i} onClick={()=>this.verInfoNomina(e.id)} className="pointer">
                        <td>{e.id}</td>
                        <td>{e.denominacion}</td>
                        <td>{e.periodo}</td>
                        <td>{e.fecha}</td>
                        <td>
                          <Link to={"/recursoshumanos/nominas/"+e.id}>
                            <i className="fa fa-arrow-right"/>
                          </Link>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </div>
            <div className={this.state.idNomina!==null?"col-4 bg-success text-wrap":""}>
                {this.state.idNomina!==null?
                  <React.Fragment>
                    <h1>{this.state.idNomina}</h1>
                      {JSON.stringify(this.props.nomina.infoNomina)}
                      Hace unos días, acompañé a mi hermano a tomar unas fotos (Es fotógrafo ocasional) a un grupo. Cuando todo terminó, la chamas decían que en edición (Photoshop) le quitaran esto, aquello, que más blanca, que más negra, mucha oreja, que exceso de naríz, en fin, una lista de correcciones xD xD :'D. A mi si me dió risa esa vaina jajaja
                  </React.Fragment>  
                :null}
            </div>
          </div>
      </div>
    )
  }
}
const mapStateProps = state => ({
  nomina: state.nomina,
  infoNomina: state.infonomina,
})
export default connect(
  mapStateProps,
  {
    mostrarNominas,
    infoNominaFun
  }
)(Nominas);