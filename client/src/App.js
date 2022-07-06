import React from "react";

import NavBar from "./components/NavBar/NavBar";
import {Route} from "react-router-dom"
import Paises from "./components/Paises/Paises";
import Buscador from "./components/Buscador/Buscador";
import Pais from "./components/Pais Detalle/Pais";
import Formulario from "./components/Formulario/Formulario";
//import './App.css';

function App() {

  return (
    // <div className="App">
    //   <h1>Henry Countries</h1>
    // </div>
    <React.Fragment>
      <NavBar/>
      <Route exact path="/" component={Buscador}/>
      <Route exact path="/" component={Paises}/>
      <Route path="/paisDetalle/:nombre/" component={Pais}/>
      <Route path="/formulario/" component={Formulario}/>
      
    </React.Fragment>
  );
}

export default App;
