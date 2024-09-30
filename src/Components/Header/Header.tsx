import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    let navList = [
        {
            name: "Status",
            link: "/status"
        },
        {
            name: "My Settings",
            link: "/settings"
        },
    ];
    
    return (
        <div className='pageHeader'>
            <h1 className='logo'>
                <Link to='/'> John blund </Link> 
            </h1>
            
            <div className='nav'>
                <ul className='navList'>
                    <li className='navItem'>
                        <Link to="/"> Home </Link>
                    </li>

                    {navList.map((item) =>
                        <li className='navItem' key={item.name}>
                            <Link to={item.link}> {item.name} </Link>
                        </li>
                    )}

                </ul>
            </div>
        </div>
    )
}

export default Header;