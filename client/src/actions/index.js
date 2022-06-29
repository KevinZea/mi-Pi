export const AGREGAR_ACTIVIDAD_TURISTICA = "AGREGAR_ACTIVIDAD_TURISTICA";
export const REMOVER_ACTIVIDAD_TURISTICA = "REMOVER_ACTIVIDAD_TURISTICA";
export const GET_PAISES = "GET_PAISES";
export const GET_PAIS_DETALLE = "GET_PAIS_DETALLE"

export function agregarActividad(payload){
    return {type: AGREGAR_ACTIVIDAD_TURISTICA, payload}
}

export function removerActividad(payload){
    return {type: REMOVER_ACTIVIDAD_TURISTICA, payload}
}

export function getPaises(){
    return function(dispatch){
        return fetch("https://restcountries.com/v3/all")
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_PAISES, payload: json})
        })
    }
}

export function getPaisDetalle(pais){
    return function(dispatch){
        return fetch("https://restcountries.com/v3/name/" + pais)
        .then(response => response.json())
        .then(json => {
            dispatch({type: GET_PAIS_DETALLE, payload: json})
        })
    }
}