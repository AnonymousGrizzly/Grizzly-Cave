import React from 'react'
import { NavLink } from 'react-router-dom';
export default function NavItem({onClick, className, text, activeClassName, to}) {
    if(to=="/"){
        return  <li><NavLink to={to} className={className} onClick={onClick} activeClassName={activeClassName} exact >{text}</NavLink></li>
    }
    return  <li><NavLink to={to} className={className} onClick={onClick} activeClassName={activeClassName} >{text}</NavLink></li>
}

