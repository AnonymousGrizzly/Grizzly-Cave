import React, {useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import { NavLink } from 'react-router-dom';
import '../designs/Navbar.css';
import icon from "../images/encryption-white.png";

function Navbar() {
  /*{!auth && (
    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
      <li className='nav-item'>
        <NavLink smooth to='/profile' activeClassName="nav-links-active"  className='nav-links' onClick={closeMobileMenu}> Profile </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink smooth to='/mail' activeClassName="nav-links-active"  className='nav-links' onClick={closeMobileMenu}> Mail </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink smooth to='/storage' activeClassName="nav-links-active"  className='nav-links' onClick={closeMobileMenu}> Storage </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink smooth to='/signout' activeClassName="nav-links-active"  className='nav-links' onClick={closeMobileMenu}> Sign Out </NavLink>
      </li>
    </ul>
  )}
    const auth = useState(true);*/
    const [click, setClick] = useState(false), handleClick = () => setClick(!click), closeMobileMenu = () => setClick(false);
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <img src={icon} alt="" id="icon"/>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> GrizzlyCave </Link>
          <div className='menu-icon' onClick ={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <NavLink exact smooth to='/' activeClassName="nav-links-active" className='nav-links' onClick={closeMobileMenu}> Home </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink smooth to='/news' activeClassName="nav-links-active"  className='nav-links' onClick={closeMobileMenu}> News </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink smooth to='/signin' activeClassName="nav-links-active"  className='nav-links' onClick={closeMobileMenu}> Sign Up/In </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar