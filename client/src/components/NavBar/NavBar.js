import React from 'react';
import {NavLink} from 'react-router-dom';

import './Navbar.css';
import Logo from '../../img/Logo.png'

export default function NavBar(){
    return (
        <nav>
            
                <div>
                    <NavLink exact to="/">
                        <img src={Logo}></img>
                    </NavLink>
                </div>
                <ul>
                <li>
                    <NavLink exact to="/formulario/" className={"boton"}>Crear Actividad Turistica</NavLink>
                </li>
            </ul>
        </nav>
    )
}