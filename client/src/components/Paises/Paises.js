import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Paises.css'
import { getPaises } from "../../actions";

function mapStateToProps(state){
    //console.log(state)
    return {
        paises: state.paises
    }
}

function mapDispatchToProps(dispatch){
    return{
        getPaises: () => dispatch(getPaises())
    }
}
const continentes = ["America", "Africa", "Asia", "Europe", "Oceania", "Antarctica"]
export class Paises extends Component{
    constructor(props){
        super(props)
        this.state = {
            paisesN: [],
            currentPage: -1,
            currentDos: -1,
            filtradoC : "no",
            paisesFiltrados: [],
            paisesPorContinente: [],
        }
    }
    componentWillMount(){
        this.props.getPaises()
        
        
    }

    handleChange(paisesDiez, nombreProp, nombreCurrent){
        //console.log(paisesDiez)
        //this.setState({paisesN: [...props.paises.slice(0, 10)]})
        
        let copiaPaises = [...paisesDiez]//[...this.props.paises]
        const item = 10
        const totalElementos = paisesDiez.length//this.props.paises.length

        let nextPage = this.state[nombreCurrent] + 1
        
        let firstIndex = nextPage * item
        if(firstIndex >= totalElementos) return;
        this.setState({
            [nombreProp]: copiaPaises.splice(firstIndex, item),
            [nombreCurrent]: nextPage
        })
        console.log(this.state[nombreProp])
    }
    prevChange(paisesDiez, nombreProp, nombreCurrent){
        let copiaPaises = [...paisesDiez]  //[...this.props.paises]
        const item = 10
        let prevPage = this.state[nombreCurrent] - 1
        if(prevPage < 0) return
        let firstIndex = prevPage * item
        this.setState({
            [nombreProp]: copiaPaises.splice(firstIndex, item),
            [nombreCurrent]: prevPage
        })
    }
    filtrado(e){
        //console.log("paso por filtrado")
        this.setState({
            filtradoC: e.target.value
        })
    }
    ordenarPaisC(e){
        //console.log("pasa por la funcion")
        
        
        let copiaPaises = [...this.props.paises]
        let continente = e.target.value
        let paisesF = copiaPaises.filter((pais) => pais.continents[0].includes(continente))
        this.setState({
            paisesFiltrados: paisesF,
            paisesPorContinente: [],
            currentDos: -1
        })

    }
    render(){
        let contador = 0;
        //let primerosPaises = [...this.props.paises.slice(0, 9)]
        //let primerosPaisesPorContinente = [...this.state.paisesPorContinente.slice(0, 9)]
        
        return(
            <div>
                <h2>Paises</h2>

                <div>
                    <h3>Filtrar por:</h3>
                    <label><input type="radio" id="continente" value="on" checked={this.state.filtradoC === "on"} onChange={(e) => this.filtrado(e)}/>Continente</label>
                    <label><input type="radio" id="actividad" value="in" checked={this.state.filtradoC === "in"} onChange={(e) => this.filtrado(e)}/>Actividad Turistica</label>
                    <label><input type="radio" id="continente" value="no" checked={this.state.filtradoC === "no"} onChange={(e) => this.filtrado(e)}/>No filtrar</label>
                    
                </div>
                {this.state.filtradoC === "no" ?(
                    
                <div>
                    <ul>
                        {this.state.paisesN.length <= 0 ?(
                            
                            this.handleChange(this.props.paises, "paisesN", "currentPage")
                        ): <div></div>}
                        {this.state.paisesN.map((pais) => {
                            return(
                                <li key={++contador}>
                                    <span>{pais.name.common}</span>
                                </li>
                            )
                        })}

                    </ul>
                    <div>
                        <h3>Nº Pag {this.state.currentPage} de {(this.props.paises.length / 10) - 1}</h3>
                        <button onClick={() => this.prevChange(this.props.paises, "paisesN", "currentPage")}>Anterior</button>
                        <button onClick={() => this.handleChange(this.props.paises, "paisesN", "currentPage")}>Siguiente</button>
                    </div>

                    
                </div>
                ): <div>
                    {this.state.filtradoC === "on" ?(
                        <div>
                            
                            <select name="continentes" onChange={(e) => this.ordenarPaisC(e)}>
                                <option key={1000} disabled="">Escoge un continente</option>
                                
                                {continentes.map((con) => {
                                    return(
                                        
                                        <option key={++contador} value={con}>{con}</option>
                                    )
                                })}
                            </select>
                            
                            
                                <ul>
                                    {this.state.paisesFiltrados.length > 0 ?(
                                        
                                        <button onClick={() => this.handleChange(this.state.paisesFiltrados, "paisesPorContinente", "currentDos")}>Mostrar Paises</button>
                                    ): <div></div>}
                                    {this.state.paisesPorContinente.length > 0 ?(
                                        
                                        this.state.paisesPorContinente.map((pais) => {
                                            return(
                                                <li key={++contador}>
                                                    
                                                    <span>{pais.name.common}</span>
                                                </li>
                                            )
                                        })
                                    ): <h4>Escoge un continente</h4>}
                                </ul>

                    <div>
                        
                        <button onClick={() => this.prevChange(this.state.paisesFiltrados, "paisesPorContinente", "currentDos")}>Anterior</button>
                        <button onClick={() => this.handleChange(this.state.paisesFiltrados, "paisesPorContinente", "currentDos")}>Siguiente</button>
                    </div>
                            
                        </div>
                    ): <h4>filtrado por actividad</h4>}
                    
                    </div>}

            </div>
        )
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paises)
