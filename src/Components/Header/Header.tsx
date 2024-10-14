import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = () => {
    let navList = [
        {
            name: "Home",
            link: "/"
        }
        {
            name: "Sleep Report",
            link: "/report"
        },
        {
            name: "My Settings",
            link: "/settings"
        },
    ];
    
    return (
        <div className='pageHeader'>
            <h1 className='logo'>
                <Link to='/'> John Blund </Link> 
            </h1>
            
            <ul className='navList'>
                {navList.map((item) =>
                    <li className='navItem' key={item.name}>
                        <Link to={item.link}> {item.name} </Link>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Header;