import React from "react";

import NavBar from "./components/NavBar/NavBar";
import {Route} from "react-router-dom"
import Paises from "./components/Paises/Paises";
import Buscador from "./components/Buscador/Buscador";
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
      
    </React.Fragment>
  );
}

export default App;
