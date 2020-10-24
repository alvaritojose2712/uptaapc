import React, {Component} from 'react';

function Cargando(props) {
	return(
		<div className="loaders text-center mt-2" >
			<div className="loader" style={{display:props.active?"":"none"}}>
		        <div className="loader-inner ball-pulse">
		          <div className="bg-warning"></div>
		          <div className="bg-primary"></div>
		          <div className="bg-success"></div>
		        </div>
		     </div>
		</div>
	);
}
export default Cargando;