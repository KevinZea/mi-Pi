import React, {Component} from "react";
import {connect} from 'react-redux';
import { getPaisDetalle, removerActividad } from "../../actions";
import './Pais.css'

function mapStateToProps(state){
    return {
        paisDetalle: state.paisDetalle,
        eliminados: state.eliminados
    }
}

function mapDispatchToProps(dispatch){
    return{
        getPaisDetalle: (pais) => dispatch(getPaisDetalle(pais)),
        removerActividad: (obj) => dispatch(removerActividad(obj))
    }
}

export class Pais extends Component {

    
    constructor(props){
        super(props)
        }
        componentWillMount(){
            let nombre = this.props.match.params.nombre.toLowerCase()
            this.props.getPaisDetalle(nombre)
            
        }
        eliminarActividad(idPais, idAct){
            
            this.props.removerActividad({idPais: idPais, idActivity: idAct})
            
        }
    render(){
        let contador = 0;
        return(
            <div className="pais">
                {this.props.paisDetalle.length > 0?(
                <div>
                <h1>{this.props.paisDetalle[0].name}</h1>
                <img src={this.props.paisDetalle[0].flag}></img>
                <div className="info">
                <h3>Continente: {this.props.paisDetalle[0].continent}</h3>
                <h4>Codigo: {this.props.paisDetalle[0].id}</h4>
                <h4>Capital: {this.props.paisDetalle[0].capital}</h4>
                <h4>Subregion: {this.props.paisDetalle[0].subregion}</h4>
                <h4>Area: {this.props.paisDetalle[0].area} Km2</h4>
                <h4>Poblacion: {this.props.paisDetalle[0].population}</h4>
                <div className="turisticas">
                    <h4>Actividades Turisticas</h4>
                    <ul>
                        {this.props.paisDetalle[0].actividads.length > 0 ?(
                            this.props.paisDetalle[0].actividads.map((a) => {
                                return(
                                    <div className="listado">
                                    <li key={++contador}>{a.name}</li>
                                    {/* <button onClick={() => this.eliminarActividad(this.props.paisDetalle[0].id, a.id)}>X</button> */}
                                    </div>
                                )
                            })
                        ):<h4>Sin actividades agregadas</h4>}
                        
                    </ul>
                </div>
                </div>
                </div>
                ):<h4>Cargando</h4>}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Pais);
