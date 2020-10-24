export const mostrarNominas = (callback=null) => dispatch => {
	axios
	.get(`/recursoshumanos/nominasController`)
	.then(res => {
		dispatch({
			type: "NOMINA",
			payload: res.data
		})
		if(callback!==null) callback()
	})
}

export const infoNominaFun = (id,callback=null) => dispatch => {
	axios
	.get(`/recursoshumanos/infoNomina/${id}`)
	.then(res => {
		dispatch({
			type: "NOMINAINFO",
			payload: res.data
		})
		if(callback!==null) callback()
	})
}

