import{
    AGREGAR_ACTIVIDAD_TURISTICA,
    REMOVER_ACTIVIDAD_TURISTICA,
    GET_PAISES,
    GET_PAIS_DETALLE
}from "../actions/index";

const initialState = {
    paises: [],
    paisDetalle: [],
    actividadesTuristicas: []
}

function rootReducer(state = initialState, action){
    if(action.type === AGREGAR_ACTIVIDAD_TURISTICA){
        return{
            ...state,
            actividadesTuristicas: [...state.actividadesTuristicas, action.payload]
        }
    }
    if(action.type === REMOVER_ACTIVIDAD_TURISTICA){
        return{
            ...state,
            actividadesTuristicas: state.actividadesTuristicas.filter((element) => {return element.id !== action.payload})
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