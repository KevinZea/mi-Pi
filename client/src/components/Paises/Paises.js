import React, {Component} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import './Paises.css'
import { getPaises, get_actividad } from "../../actions";

function mapStateToProps(state){
    return {
        paises: state.paises,
        actividadesTuristicas: state.actividadesTuristicas
    }
}

function mapDispatchToProps(dispatch){
    return{
        getPaises: () => dispatch(getPaises()),
        get_actividad: (value) => dispatch(get_actividad(value))
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
            currentTres: -1,
            currentCuatro: -1,
            currentPoblacion: -1,
            currentPoblacionAlreves: -1,
            filtradoC : "no",
            paisesFiltrados: [],
            paisesPorContinente: [],
            estadoOrdenamiento: "no",
            mayorMenos: "def",
            paisesOrdenados: [],
            paisesOrdenadosAlreves: [],
            paisesOEstado: [],
            paisesOEstadoAlreves: [],
            paisesNumeroPoblacion: [],
            paisesNumeroPoblacionAlreves: [],
            diezPaisesPorNumeroP: [],
            diezPaisesPorNumeroPAlreves: [],
            sc: "def",
            activity: '',
        }
    }
    componentWillMount(){
        this.props.getPaises()
        
        
    }

    handleChange(paisesDiez, nombreProp, nombreCurrent){
        
        let copiaPaises = [...paisesDiez]

        const item = 10
        const totalElementos = paisesDiez.length

        let nextPage = this.state[nombreCurrent] + 1
        
        let firstIndex = nextPage * item
        if(firstIndex >= totalElementos) return;
        
        
        this.setState({
            [nombreProp]: copiaPaises.splice(firstIndex, item),
            [nombreCurrent]: nextPage
        })
        
    }
    prevChange(paisesDiez, nombreProp, nombreCurrent){
        let copiaPaises = [...paisesDiez]
        const item = 10
        let prevPage = this.state[nombreCurrent] - 1
        if(prevPage < 0) return
        let firstIndex = prevPage * item
        this.setState({
            [nombreProp]: copiaPaises.splice(firstIndex, item),
            [nombreCurrent]: prevPage
        })
    }
    filtrado(e, nombreProp){
       

        this.setState({
            [nombreProp]: e.target.value
        })
        if(e.target.value === "alfa"){
            this.handleChange(this.props.paises, "paisesN", "currentPage", e.target.value, "asc")
        }
    }
    ordenarPaisC(e){
        
        
        let copiaPaises = [...this.props.paises]
        let continente = e.target.value
        let paisesF = copiaPaises.filter((pais) => pais.continent.includes(continente))
        this.setState({
            paisesFiltrados: paisesF,
            paisesPorContinente: [],
            currentDos: -1
        })

    }
    escender(e){
        let copiaPaises = [...this.props.paises]

        if(e === "default"){

            copiaPaises = copiaPaises.sort((a, b) => {
                if(a.name < b.name) return -1
                else if(a.name > b.name) return 1
                else return 0
            })
            this.setState({
                mayorMenos: "asc",
                paisesOrdenados: [...copiaPaises]
            })

            this.handleChange(copiaPaises, "paisesOEstado", "currentTres")
        }
        else{

            if(e === "dsc"){
                
                let paisesALreves = copiaPaises.sort((a, b) => {
                    if(a.name < b.name) return -1
                    else if(a.name > b.name) return 1
                    else return 0
                }).reverse()
                this.setState({
                    mayorMenos: e,
                    paisesOrdenadosAlreves: [...paisesALreves]
                })
                this.handleChange(paisesALreves, "paisesOEstadoAlreves", "currentCuatro")
            }
            else{
                this.setState({
                    mayorMenos: e.target.value
                })
            }
        }
    }
    ordenarNumeroPoblacion(e){
        let copiaPaises = [...this.props.paises]

        if(e === "default"){

            copiaPaises = copiaPaises.sort((a, b) => {
                if(a.population < b.population) return -1
                else if(a.population > b.population) return 1
                else return 0
            })
            this.setState({
                sc: "asc",
                paisesNumeroPoblacion: [...copiaPaises]
            })

            this.handleChange(copiaPaises, "diezPaisesPorNumeroP", "currentPoblacion")
        }
        else{

            if(e === "dsc"){
                
                let paisesALreves = copiaPaises.sort((a, b) => {
                    if(a.population < b.population) return -1
                    else if(a.population > b.population) return 1
                    else return 0
                }).reverse()
                this.setState({
                    sc: e,
                    paisesNumeroPoblacionAlreves: [...paisesALreves]
                })
                this.handleChange(paisesALreves, "diezPaisesPorNumeroPAlreves", "currentPoblacionAlreves")
            }
            else{
                this.setState({
                    sc: e.target.value
                })
            }
        }
    }
    despacharActividad(valor){
        this.props.get_actividad(valor)
        this.setState({
            activity: ''
        })
    }
    nombrarActividad(e){
        this.setState({
            activity: e.target.value
        })
    }
    render(){
        let contador = 0;
        
        return(
            <div className={"paisesA"}>
                

                <div className={"filtrado"}>
                    <h3>Filtrar por:</h3>
                    <label><input type="radio" id="continente" value="on" className={"input"} checked={this.state.filtradoC === "on"} onChange={(e) => this.filtrado(e, "filtradoC")}/>Continente</label>
                    <label><input type="radio" id="actividad" value="in" checked={this.state.filtradoC === "in"} onChange={(e) => this.filtrado(e, "filtradoC")}/>Actividad Turistica</label>
                    <label><input type="radio" id="continente" value="no" checked={this.state.filtradoC === "no"} onChange={(e) => this.filtrado(e, "filtradoC")}/>No filtrar</label>
                    
                </div>

                {this.state.filtradoC === "no" ?(
                 <div>   

                <div className={"ordenamiento"}>
                    <h3>Ordenar Por:</h3>
                    <label><input type="radio" id="Alfabetico" value="alfa" checked={this.state.estadoOrdenamiento === "alfa"} onChange={(e) => this.filtrado(e, "estadoOrdenamiento")}></input>Alfabeticamente   </label>
                    <label><input type="radio" id="Poblacion" value="pobla" checked={this.state.estadoOrdenamiento === "pobla"} onChange={(e) => this.filtrado(e, "estadoOrdenamiento")}></input>Numero de Población   </label>
                    <label><input type="radio" id="noOrden" value="no" checked={this.state.estadoOrdenamiento === "no"} onChange={(e) => this.filtrado(e, "estadoOrdenamiento")}></input>No ordenar  </label>

                    <div>
                        {this.state.estadoOrdenamiento === "alfa" ? (
                            <div>
                            <label><input type="radio" id="Asc" value="asc" checked={this.state.mayorMenos === "asc"} onChange={(e) => this.escender(e)}></input>Ascendentemente</label>
                            <label><input type="radio" id="Dsc" value="dsc" checked={this.state.mayorMenos === "dsc"} onChange={(e) => this.escender(e)}></input>Descendentemente</label>
                            </div>
                        ): <div>
                            {this.state.estadoOrdenamiento === "pobla" ?(
                                <div>
                                <label><input type="radio" id="Asc" value="asc" checked={this.state.sc === "asc"} onChange={(e) => this.ordenarNumeroPoblacion(e)}></input>Ascendentemente</label>
                                <label><input type="radio" id="Dsc" value="dsc" checked={this.state.sc === "dsc"} onChange={(e) => this.ordenarNumeroPoblacion(e)}></input>Descendentemente</label>
                                </div>
                            ): <div></div>}
                            </div>}
                    </div>
                </div>
                 {this.state.estadoOrdenamiento === "no" ?(

                    
                <div className={"Uno"}>
                
                        {this.state.paisesN.length <= 0 ?(
                            
                            this.handleChange(this.props.paises, "paisesN", "currentPage")
                        ): <div></div>}
                        {this.state.paisesN.map((pais) => {
                            return(
                                
                                <div className={"tarjeta"}>
                                    <h3>{pais.name}</h3>
                                    <img src={pais.flag} className={"bandera"}></img>
                                    <h4>Continente: {pais.continent}</h4>
                                </div>
                                
                            )
                        })}

                    
                    <div className="botones">
                        <h2>Nº Pag {this.state.currentPage} de {(this.props.paises.length / 10) - 1}</h2>
                        <button onClick={() => this.prevChange(this.props.paises, "paisesN", "currentPage")}>Anterior</button>
                        <button onClick={() => this.handleChange(this.props.paises, "paisesN", "currentPage")}>Siguiente</button>
                    </div>

                    
                </div>
                ):<div>
                    {this.state.estadoOrdenamiento === "alfa" ?(
                        <div>
                        {this.state.mayorMenos === "def" ?(
                            this.escender("default")
                        ):<div></div>}
                        {this.state.mayorMenos === "asc" ?(
                        <div className="Uno">
                        
                        {this.state.paisesOEstado.map((pais) =>{
                            return(
                                <div className={"tarjeta"}>
                                    <h3>{pais.name}</h3>
                                    <img src={pais.flag} className={"bandera"}></img>
                                    <h4>Continente: {pais.continent}</h4>
                                </div>
                            )
                        })}
                        
                            <div className="botones">
                                <h2>Nº Pag {this.state.currentTres} de {(this.state.paisesOrdenados.length / 10) - 1}</h2>
                                <button onClick={() => this.prevChange(this.state.paisesOrdenados, "paisesOEstado", "currentTres")}>Anterior</button>
                                <button onClick={() => this.handleChange(this.state.paisesOrdenados, "paisesOEstado", "currentTres")}>Siguiente</button>
                            </div>
                        </div>

                        ): <div>

                            {this.state.mayorMenos === "dsc" ?(
                                this.state.paisesOEstadoAlreves.length <= 0 ?(
                                    this.escender("dsc")
                                ):
                                <div className="Uno">
                                
                                {this.state.paisesOEstadoAlreves.map((pais) => {
                                    return(
                                    <div className="tarjeta">
                                        <h3>{pais.name}</h3>
                                        <img src={pais.flag} className={"bandera"}></img>
                                        <h4>Continente: {pais.continent}</h4>
                                    </div>
                                    )
                                })
                                }
                                
                                <div className="botones">
                                    <h2>Nº Pag {this.state.currentCuatro} de {(this.state.paisesOrdenadosAlreves.length / 10) - 1}</h2>
                                    <button onClick={() => this.prevChange(this.state.paisesOrdenadosAlreves, "paisesOEstadoAlreves", "currentCuatro")}>Anterior</button>
                                    <button onClick={() => this.handleChange(this.state.paisesOrdenadosAlreves, "paisesOEstadoAlreves", "currentCuatro")}>Siguiente</button>
                                </div>
                                </div>
                            ): <div></div>}
                            
                            
                            </div>}
                        </div>

                    ): <div>
                        {this.state.estadoOrdenamiento === "pobla" ?(
                            <div>
                                {this.state.sc === "def" ?(
                                    this.ordenarNumeroPoblacion("default")
                                ): <div></div>}
                                {this.state.sc === "asc" ?(
                                    <div className="Uno">
                                        
                                            {this.state.diezPaisesPorNumeroP.map((pais) => {
                                                return(
                                                    <div className="tarjeta">
                                                        <h3>{pais.name}</h3>
                                                        <img src={pais.flag} className={"bandera"}></img>
                                                        <h4>Continente: {pais.continent}</h4>
                                                        <h4>Poblacion: {pais.population}</h4>
                                                    </div>
                                                )
                                            })}
                                        
                                        <div className="botones">
                                            <h2>Nº Pag {this.state.currentPoblacion} de {(this.state.paisesNumeroPoblacion.length / 10) - 1}</h2>
                                            <button onClick={() => this.prevChange(this.state.paisesNumeroPoblacion, "diezPaisesPorNumeroP", "currentPoblacion")}>Anterior</button>
                                            <button onClick={() => this.handleChange(this.state.paisesNumeroPoblacion, "diezPaisesPorNumeroP", "currentPoblacion")}>Siguiente</button>
                                        </div>
                                    </div>
                                ):<div>
                                    {this.state.sc === "dsc" ?(
                                        this.state.diezPaisesPorNumeroPAlreves.length <= 0 ?(
                                            this.ordenarNumeroPoblacion("dsc")
                                        ):<div className="Uno">
                                            
                                                {this.state.diezPaisesPorNumeroPAlreves.map((pais) => {
                                                    return(
                                                    <div className="tarjeta">
                                                        <h3>{pais.name}</h3>
                                                        <img src={pais.flag} className={"bandera"}></img>
                                                        <h4>Continente: {pais.continent}</h4>
                                                        <h4>Poblacion: {pais.population}</h4>
                                                    </div>
                                                    )
                                                })}
                                            
                                            <div className="botones">
                                                <h2>Nº Pag {this.state.currentPoblacionAlreves} de {(this.state.paisesNumeroPoblacionAlreves.length / 10) - 1}</h2>
                                                <button onClick={() => this.prevChange(this.state.paisesNumeroPoblacionAlreves, "diezPaisesPorNumeroPAlreves", "currentPoblacionAlreves")}>Anterior</button>
                                                <button onClick={() => this.handleChange(this.state.paisesNumeroPoblacionAlreves, "diezPaisesPorNumeroPAlreves", "currentPoblacionAlreves")}>Siguiente</button>
                                            </div>
                                        </div>
                                    ): <></>}
                                    
                                    </div>}
                            </div>
                        ): <div></div>}


                        </div>}
                </div>}
            </div>
                ): <div>
                    {this.state.filtradoC === "on" ?(
                        <div>
                            <div className="selector">
                            <select name="continentes" onChange={(e) => this.ordenarPaisC(e)}>
                                <option key={1000} disabled="">Escoge un continente</option>
                                
                                {continentes.map((con) => {
                                    return(
                                        
                                        <option key={++contador} value={con}>{con}</option>
                                    )
                                })}
                            </select>
                            </div>
                            
                                <div className="Uno">
                                    {this.state.paisesFiltrados.length > 0 ?(
                                        
                                        <button onClick={() => this.handleChange(this.state.paisesFiltrados, "paisesPorContinente", "currentDos")} className="mostrar">Mostrar Paises</button>
                                    ): <div></div>}
                                    {this.state.paisesPorContinente.length > 0 ?(
                                        
                                        this.state.paisesPorContinente.map((pais) => {
                                            return(
                                                <div className="tarjeta">
                                                    <h3>{pais.name}</h3>
                                                    <img src={pais.flag} className={"bandera"}></img>
                                                    <h4>Continente: {pais.continent}</h4>
                                                </div>
                                            )
                                        })
                                    ): <h4 className="escoge">Escoge un continente</h4>}
                                </div>

                    <div className="botones">
                        
                        <button onClick={() => this.prevChange(this.state.paisesFiltrados, "paisesPorContinente", "currentDos")}>Anterior</button>
                        <button onClick={() => this.handleChange(this.state.paisesFiltrados, "paisesPorContinente", "currentDos")}>Siguiente</button>
                    </div>
                            
                        </div>
                    ): <div className="Actividad">
                        <h2>Busca tu actividad</h2>
                        <input type="text" value={this.state.activity} onChange={(e) => this.nombrarActividad(e)}/>
                        
                        <button onClick={() => this.despacharActividad(this.state.activity)}>Buscar Actividad</button>
                        {this.props.actividadesTuristicas.length > 0 ?(
                            this.props.actividadesTuristicas.map((a) => {
                                return(
                                    <div>
                                        
                                        <Link to={'/paisDetalle/'+ a.name +'/'}>
                                            <h3> º {a.name} º </h3>
                                        </Link>

                                    </div>
                                )
                            })
                        ): <div>
                            <h4>No hay actividades por ese nombre, intenta agregar una</h4>
                            </div>}
                        </div>}
                    
                    </div>}

            </div>
        )
    }

}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Paises)
