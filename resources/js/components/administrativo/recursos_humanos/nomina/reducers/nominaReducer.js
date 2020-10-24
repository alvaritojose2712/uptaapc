

const initialState = {
	nomina: [],
	infoNomina: "",
}

export default function(state = initialState, {type,payload}){
	switch(type){
		case "NOMINA":
			return {...state,nomina:payload}
		case "NOMINAINFO":
			return {...state,infoNomina:payload}
		default:
			return state
	}
}
