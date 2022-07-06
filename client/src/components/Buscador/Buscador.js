import React, {Component} from "react";
import {connect} from 'react-redux';
import { Link } from "react-router-dom";
import './Buscador.css'
import { getPaisDetalle } from "../../actions";

function mapStateToProps(state){
    return {
        paisDetalle: state.paisDetalle
    }
}

function mapDispatchToProps(dispatch){
    return{
        getPaisDetalle: (pais) => dispatch(getPaisDetalle(pais))
    }
}

export class Buscador extends Component {
    constructor(props){
        super(props);
        this.state = {
            pais: ""
        }
    }
    handleChange(event){
        this.setState({pais: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault()
        this.props.getPaisDetalle(this.state.pais)
    }

    render(){
        const {pais} = this.state;
        return (
            <div className={"busca"}>
                <h2>Busca tu pais</h2>
                <form className="buscadorPais" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="lexico">
                        <input
                        className="buscador"
                        type="text"
                        id="pais"
                        value={pais}
                        onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <button type="submit">Buscar</button>

                </form>
                {!this.props.paisDetalle.message ? (
                this.props.paisDetalle.length > 0 ? (
                    <div className={"paisB"}>
                        <h2>Detalles de</h2>
                        <Link to={'/paisDetalle/'+ this.props.paisDetalle[0].name + '/'}>
                        <h3> º {this.props.paisDetalle[0].name} º </h3>
                        </Link>
                        
                    </div>
                ): <h3>intenta buscar un pais</h3>
                ): <h4>Pais no encontrado</h4>}
            </div>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buscador);