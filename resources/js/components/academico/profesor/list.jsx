import React, {Component} from 'react';

export const List = ({obj,changeState,prop,preprop,title,returnUrl,filter}) => {
	
	return <React.Fragment>
		<div className={(prop==="idtray"?"hidden":"")}>
			<i className="fa fa-arrow-left mr-3 hover" onClick={()=>changeState({[preprop]:null})}></i>
			{title&&title.length?returnUrl(title):null}
		</div>
		<div className="div">
			{Object.keys(obj).map((e,i)=>
				filter==e.substr(0,filter.length).toLowerCase()||filter==""?<button key={i} className="btn btn-xl btn-outline-primary hover mr-2 mt-2" onClick={()=>changeState({[prop]:e})}>{e}</button>
				:null
			)}
		</div>
	</React.Fragment>
}