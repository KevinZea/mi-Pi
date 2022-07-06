import React, {Component} from "react";
import { connect } from "react-redux";
import { getPaises, getPaisDetalle, agregarActividad } from "../../actions";
import './Formulario.css'

function mapStateToProps(state){
    return {
        paises: state.paises,
        paisDetalle: state.paisDetalle
    }
}

function mapDispatchToProps(dispatch){
    return{
        getPaises: () => dispatch(getPaises()),
        getPaisDetalle: (pais) => dispatch(getPaisDetalle(pais)),
        agregarActividad: (value) => dispatch(agregarActividad(value))
    }
}

export class Formulario extends Component {
    constructor(props){
        super(props)
        this.state = {
            paisesAgregados: [],
            val: false,
            datos: {
                name: '',
                difficulty: 1,
                duration: '0',
                season: "todas",
                pais: '',
                country: [],
                val: false
            },
            input: {
                name: undefined,
                duration: undefined,
                pais: undefined,
            },
            errors:{
                mensaje: undefined
            },
        }
    }
    validate(input){
        let errors = {};
        if(!input.name){
            errors.name = 'El nombre es requerido'

        }
        if(!input.duration){
            errors.duration = "la duracion no puede estar vacia"
        } else if(input.duration < 1){
            errors.duration = "la duracion no puede ser tan corta"
        }
        if(!input.pais){
            errors.pais = "pais invalido"
        }
        return errors
    }
    handle(e){
        let datosEnviar = {...this.state.datos, [e.target.name]: e.target.value.toString()}
        if(datosEnviar.name.length > 2){
            datosEnviar.val = false
        }
        else{
            datosEnviar.val = true
        }

        this.setState({
            datos: {...datosEnviar},
            input:{...this.state.input, [e.target.name]: e.target.value},
            errors: this.validate({
                ...this.state.input,
                [e.target.name]: e.target.value,


            }),

        })
    }
    sendValidate(e){
        e.preventDefault()
        console.log(this.state.datos)
        if(e.target.name === "crear"){
            
            this.props.agregarActividad(this.state.datos)
            let datosN = {name: '', duration: '', country: [], season: "todas", pais: '', val: false}
            this.setState({
                datos: {...datosN}
            })
        }

    }
    opcionDificultad(e, nombreProp){
        let datosEnviar = {...this.state.datos, [nombreProp]: e.target.value}
        this.setState({
            datos: {...datosEnviar}
        })
        
    }
    despacharPais(){
        this.props.getPaisDetalle(this.state.datos.pais)
        let array = [...this.state.datos.country]
        let prueba = []
        if(this.state.datos.country.length > 0){
            for(let ele of array){
                if(ele === this.state.datos.pais){
                    prueba.push(ele)
                }
                
            }
        }

        if(prueba.length > 0){
            this.setState({
                val: true
            })
        }
        else{
            this.setState({
                val: false
            })
        }

    }
    agregarPais(){
        let p = [...this.state.datos.country]
        p.push(this.props.paisDetalle[0].id)
        let datos = {...this.state.datos}
        datos.country = [...p]
        let paises = [...this.state.datos.country]
        let prueba = []
        
        if(paises.length > 0){
            for(let ele of paises){
                if(ele === this.props.paisDetalle[0].id){
                    
                    prueba.push(ele)
                    
                }
                
            }
        }
        else{
            this.setState({
                datos: {...datos}
            })
        }
        if(prueba.length > 0){
            this.setState({
                val: true
            })
        }
        else{
            this.setState({
                val: false,
                datos: {...datos}
            })
        }
        
    }
    eliminarPais(indice){
        let paises = [...this.state.datos.country]
        paises = paises.filter((pais) => pais !== indice)
        let datos = {...this.state.datos}
        datos.country = [...paises]
        this.setState({
            datos: {...datos}
        })
    }
    render(){
        return(
            <form onSubmit={(e) => this.sendValidate(e)} className={"formulario"}>
                <div>
                    <h1>Crea tu actividad Turistica</h1>
                    <br/>
                    <h3>Nombre de la actividad</h3>
                    <input className={this.state.errors.name && 'danger'} type="text" name="name" onChange={(e) => this.handle(e)}value={this.state.input.name}/>
                    {this.state.errors.name && (
                        <p className="danger">{this.state.errors.name}</p>
                    )}
                </div>
                <br/>
                <div>
                    <h3>Selecciona la dificultad</h3>
                    <select name="difficulty" onChange={(e) => this.opcionDificultad(e, "difficulty")}>
                        <option value={1}>Facil</option>
                        <option value={2}>Media</option>
                        <option value={3}>Dificil</option>
                    </select>
                </div>
                <br></br>
                <div>
                    <h3>Escribe la duracion en minutos</h3>
                    <input className={this.state.errors.duration && 'danger'} type="number" name="duration" onChange={(e) => this.handle(e)} value={this.state.input.duration}></input>
                    <p className="danger">{this.state.errors.duration}</p>
                </div>
                <br></br>
                <div>
                    <h3>Selecciona la temporada de la actividad</h3>
                    <select onChange={(e) => this.opcionDificultad(e, "season")}>
                        <option value={"todas"}>Selecione una temporada</option>
                        <option value={"primavera"}>Primavera</option>
                        <option value={"verano"}>Verano</option>
                        <option value={"otoño"}>Otoño</option>
                        <option value={"invierno"}>Invierno</option>
                    </select>
                </div>
                <br></br>
                <div>
                    <h3>Escribe el/los pais(es) donde se celebre tu actividad</h3>
                    <input className={this.state.errors.pais && 'danger'} type="text" name="pais" onChange={(e) => this.handle(e)} value={this.state.input.pais}></input>
                    <button onClick={() => this.despacharPais()} disabled={this.state.datos.pais === ''}>Buscar Pais</button>
                    <p className="danger">{this.state.errors.pais}</p>
                    <div>
                        {this.props.paisDetalle.length > 0 &&(
                            <button onClick={() => this.agregarPais()} disabled={this.state.val}>Agregar a {this.props.paisDetalle[0].name}</button>
                        )}
                        {this.props.paisDetalle.message &&(
                            <label>Pais no encontrado, por favor intenta de nuevo</label>
                        )}
                    </div>
                    <br></br>
                </div>
                <br></br>
                <div>
                    {this.state.datos.country.length > 0 ?(
                        <div>
                            <h3>Paises agregados</h3>
                        <ul>
                        {this.state.datos.country.map((pais) => {
                            
                            return(
                                <li>
                                    
                                    <span>{pais}</span>
                                    <button name="eliminar" onClick={() => this.eliminarPais(pais)}>X</button>
                                </li>
                            )
                        })}
                        </ul>
                        </div>
                    ): <div></div>}
                </div>
                <div>
                     
                    <button name="crear" onClick={(e) => this.sendValidate(e)} disabled={this.state.datos.name === '' || this.state.datos.duration === '0' || this.state.datos.pais === '' || this.state.datos.country.length === 0 || this.state.datos.season === "todas"}>Crear</button>
                </div>

            </form>
        )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Formulario)