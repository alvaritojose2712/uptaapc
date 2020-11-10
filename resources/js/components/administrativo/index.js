import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Alert from 'react-s-alert';

import Nominas from './recursos_humanos/nomina/';
import Presupuesto from './presupuesto/';
import store  from './store'

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';

class Index extends Component{
	render(){
		return(
			<Provider store={store}>
				<Router>
					<Switch>
						<Route path='/rrhh/administrar/nominas/'>
							<Nominas/>
						</Route>
						<Route path='/rrhh/administrar/personal'>
						
						</Route>
						<Route path='/presupuesto'>
							<Presupuesto/>
						</Route>
					</Switch>
				</Router>
				<Alert stack={false} timeout={5000} position='bottom'  effect='slide'/>
			</Provider>
		);
	}
}
render(<Index/>,document.getElementById('appreact'));