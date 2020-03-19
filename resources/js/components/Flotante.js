
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';

class Flotante extends Component{
	constructor(){
		super()
		this.state = {

		}


	}

	render(){
		return(
			<div className={this.props.flotanteHide?"flotante hide":"flotante"}>
				<ul className="list-group-item">
				<li onClick={this.props.handleClick} className="list-group-item"><i className="fa fa-times"></i></li>
				{this.props.personas.map((e,i)=>
					<li key={i} className="list-group-item hover" onClick={()=>this.props.handleClickSelect(i)}>{e.nombre} {e.apellido} | {e.cedula}</li>
				)}
				</ul>
			</div>
		);
	}
}
export default Flotante
