import React, {Component} from 'react';

function Cargando(props) {
	return(
		<div className="loaders text-center" >
			<div className="loader" style={{display:props.active?"":"none"}}>
		        <div className="loader-inner ball-pulse">
		          <div className="bg-warning"></div>
		          <div className="bg-primary"></div>
		          <div className="bg-danger"></div>
		        </div>
		     </div>
		</div>
	);
}
export default Cargando;