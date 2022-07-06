import axios from "axios";
export const AGREGAR_ACTIVIDAD_TURISTICA = "AGREGAR_ACTIVIDAD_TURISTICA";
export const REMOVER_ACTIVIDAD_TURISTICA = "REMOVER_ACTIVIDAD_TURISTICA";
export const GET_PAISES = "GET_PAISES";
export const GET_PAIS_DETALLE = "GET_PAIS_DETALLE"
export const GET_ACTIVIDAD = "GET_ACTIVIDAD"


export function get_actividad(value){
    return async function(dispatch){
        var json = await axios("http://localhost:3001/activity/" + value)

        try{
            return dispatch({
                type: GET_ACTIVIDAD,
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
export function agregarActividad(payload){
    return async function(){
        const json = await axios.post("http://localhost:3001/activity", payload)
        return json;
    } 
    
}

export function removerActividad(payload){
    const {idPais, idActivity} = payload
    return async function(dispatch){
        const json = await axios.delete('http://localhost:3001/activity/'+ idPais+'/'+ idActivity)
        return dispatch({type: REMOVER_ACTIVIDAD_TURISTICA, payload: json})
    }
}

export function getPaises(){
    return function(dispatch){
        return fetch("http://localhost:3001/countries")
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_PAISES, payload: json})
        })
    }
}

export function getPaisDetalle(pais){
    return function(dispatch){
        return fetch("http://localhost:3001/countries/?name=" + pais)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_PAIS_DETALLE, payload: json})
        })
    }
}