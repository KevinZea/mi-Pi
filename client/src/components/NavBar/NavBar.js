import React from 'react';
import {NavLink} from 'react-router-dom';

import './Navbar.css';

export default function NavBar(){
    return (
        <header className='navbar'>
            <div>
                Logo
            </div>
            <nav>
                <ul className='list'>
                    <li className='list-item'>
                        <NavLink exact to="/">Home</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}