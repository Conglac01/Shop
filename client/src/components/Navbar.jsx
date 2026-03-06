import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = ({ containerStyles, setMenuOpened }) => {
    const navLinks = [
        { path: '/', title: 'Home' },
        { path: '/collection', title: 'Collection' },
        { path: '/testimonial', title: 'Testimonial' },
        { path: '/contact', title: 'Contact' },
    ]
    
    return (
        <nav className={containerStyles}>
            {navLinks.map((link) => (
                <NavLink
                    onClick={() => setMenuOpened && setMenuOpened(false)}
                    key={link.title}
                    to={link.path}
                    className={({ isActive }) => 
                        `text-sm font-semibold uppercase tracking-wider relative px-2 py-1 transition-all duration-300 ${
                            isActive 
                                ? 'active-link text-black font-bold' 
                                : 'text-gray-600 hover:text-black'
                        }`
                    }
                >
                    {link.title}
                </NavLink>
            ))}
        </nav>
    )
}

export default Navbar