import React, {useState, useEffect} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import '../designs/Navbar.css';
import icon from "../images/encryption-white.png";
import { getItem, setItem } from '../helpers/localstorage';
import { useHistory, useLocation } from 'react-router';
import { AuthService } from '../services/auth';
import NavItem from './NavItem';

function Navbar() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const history = useHistory();
    const logOut = () => {
      localStorage.removeItem("PHPTOKEN");
      history.push("/");
      setLoggedIn(false);
    }
    
    useEffect(async ()=>{
      const response = await AuthService.validateToken();
      if(response.ok){
        setLoggedIn(true);
     }else{
       logOut();  
     }
    });
    
    const [click, setClick] = useState(false); //click za mobile menu
    const handleClick = () => setClick(!click)
    const closeMobileMenu = () => setClick(false);
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <img src={icon} alt="" id="icon"/>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> GrizzlyCave </Link>
          <div className='menu-icon' onClick ={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          {!isLoggedIn ? (
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <NavItem text="Home" to="/"  className="commonLink" activeClassName="activeLink" onClick={closeMobileMenu} />
            <NavItem text="News" to="/news" className="commonLink" activeClassName="activeLink" onClick={closeMobileMenu} />
            <NavItem text="Sign Up/In" to="/signin" className="commonLink" activeClassName="activeLink" onClick={closeMobileMenu} />
          </ul>
          ):(
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
              <NavItem text="Profile" to="/profile" className="commonLink" activeClassName="activeLink" onClick={closeMobileMenu}/>
              <button className='commonLink' onClick={logOut}></button>
            </ul>
          )}
        </div>
      </nav>
    )
}

export default Navbar