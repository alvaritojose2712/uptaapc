import React, {Component} from 'react';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { store } from 'react-notifications-component';


export const handleNotification = data =>{
	try{

		store.addNotification({
		  title: data.data?(data.data.error?"¡Error!":"Ok!"):"Ok!",
		  message: data.data?(data.data.error?data.data.error:data.data.msj):data,
		  type: data.data?(data.data.error?"danger":"success"):"warning",
		  insert: "bottom",
		  container: "top-right",
		  animationIn: ["animated", "fadeIn"],
		  animationOut: ["animated", "fadeOut"],
		  dismiss: {
		    duration: 5000,
		    onScreen: true
		  }
		});
	}catch(err){
		console.log(data)
		console.log(err)
	}
}
export const Notification = () => (
	<ReactNotification />
)
