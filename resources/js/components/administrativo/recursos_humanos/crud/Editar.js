import React, {Component} from 'react';
import { connect } from 'react-redux'
import { buscarPersonal } from './actions/busquedaActions';
import Notificacion from '../../notificacion';
import InputsRegistrar from './Inputsregistrar';
import {handleNotification,Notification} from '../../../../assets/handleNotification';

class Editar extends Component{
	constructor(){
		super();
		this.editar = this.editar.bind(this)
	};
	editar(e){
		
		e.preventDefault();

		const { editUser, buscarPersonal } = this.props
		let padre = {...editUser}
		let hijos = [...editUser.hijos]
		delete padre.hijos
		axios
			.put(`/recursoshumanos/personalController/${padre.id}/`,{data_padre:padre,hijos:hijos})
		    .then(res=>{
						handleNotification(res)
		        if (res.data.code=="200") buscarPersonal()
		    })
	}
	render(){


		return(
			<form onSubmit={this.editar} method="post">
				<Notification/>
				<div className="mt-2 mb-2">
			  		<div className="btn-group">
						<button type="submit" className="btn btn-outline-info btn-lg"><i className="fa fa-save"></i> Editar información</button>
					</div>
			    </div>

			    <InputsRegistrar/>
			</form>
			
		)
	}
}


const mapStateProps = state => ({
	editUser:state.busqueda.editUser,
	notificacion:state.utilidad.notificacion,
})
export default connect(
	mapStateProps, 
	{
		buscarPersonal,
		openNotificacion,
		finishNotificacion,
	}
)(Editar)
