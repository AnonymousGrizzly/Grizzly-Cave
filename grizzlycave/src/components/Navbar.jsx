import React, { useState, useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import '../designs/Navbar.css';
import icon from '../images/encryption-white.png';
import NavItem from './NavItem';
import useAuth from '../hooks/useAuth';

function Navbar() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) setLoggedIn(true);
    else if (!user) setLoggedIn(false);
  }, [user]);

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
        <div className="menu-icon" onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
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
              text="Sign Up/In"
              to="/signin"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
          </ul>
        ) : (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <NavItem
              text="Profile"
              to="/profile"
              className="commonLink"
              activeClassName="activeLink"
              onClick={closeMobileMenu}
            />
            <button className="commonLink" onClick={logout}></button>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
