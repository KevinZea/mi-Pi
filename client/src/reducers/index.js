import{
    AGREGAR_ACTIVIDAD_TURISTICA,
    REMOVER_ACTIVIDAD_TURISTICA,
    GET_PAISES,
    GET_PAIS_DETALLE,
    GET_ACTIVIDAD
}from "../actions/index";

const initialState = {
    paises: [],
    paisDetalle: [],
    actividadesTuristicas: [],
    eliminados: []
}

function rootReducer(state = initialState, action){
    if(action.type === GET_ACTIVIDAD){
        let countryFilter = action.payload
        
        let aux = action.payload 
        return{
            ...state,
            actividadesTuristicas: aux
        }
    }
    if(action.type === AGREGAR_ACTIVIDAD_TURISTICA){
        return{
            ...state,
            
        }
    }
    if(action.type === REMOVER_ACTIVIDAD_TURISTICA){
        return{
            ...state,
            eliminados: action.payload
        }
    }
    if(action.type === GET_PAISES){
        return{
            ...state,
            paises: action.payload
        }
    }
    if(action.type === GET_PAIS_DETALLE){
        return{
            ...state,
            paisDetalle: action.payload
        }
    }
    return state
}

export default rootReducer;