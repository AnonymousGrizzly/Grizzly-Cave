import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../styles/Navbar.css';
import icon from '../images/encryption-white.png';
import NavItem from './NavItem';
import useAuth from '../hooks/useAuth';
import {Menu, X} from 'react-feather'

function Navbar() {
  const { isLoggedIn, logout } = useAuth();

  const [click, setClick] = useState(false); //click za mobile menu
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <img src={icon} alt="" id="icon" />
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          {' '}
          GrizzlyCave{' '}
        </Link>
        <div className="menu-icon" onClick={handleClick} >
          {click ? (<X size="35"/>): (<Menu size="35"/>)}  
        </div>
        
        {!isLoggedIn ? (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <NavItem
              text="Home"
              to="/"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
            <NavItem
              text="News"
              to="/news"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
            <NavItem
              text="Log In"
              to="/signin"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
          </ul>
        ) : (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <NavItem
              text="File Send"
              to="/mail"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
            <NavItem
              text="Storage"
              to="/storage"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
            <NavItem
              text="Profile"
              to="/profile"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
            <NavItem
              text="Log Out "
              to="/"
              className="commonLink"
              onClick={logout}
            />
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
