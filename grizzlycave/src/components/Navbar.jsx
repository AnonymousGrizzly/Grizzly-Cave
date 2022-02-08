import React, {useState} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import '../designs/Navbar.css';
import icon from "../images/encryption-white.png";
import { getItem, setItem } from '../helpers/localstorage';
import { useHistory } from 'react-router';
import { AuthService } from '../services/auth';
import NavItem from './NavItem';

function Navbar() {
    const history = useHistory();
    const logOut= async () => {
      localStorage.removeItem("PHPTOKEN");
      history.push("/");
    }
    const jwt_token = getItem("PHPTOKEN");
    const isLoggedIn = useState(false);
    const response = await AuthService.validateToken(jwt_token);
    if(response.ok){
      isLoggedIn=useState(true);
    }
    const [click, setClick] = useState(false), handleClick = () => setClick(!click), closeMobileMenu = () => setClick(false); //zakaj je to kle
    return (
      <nav className="navbar">
        <div className="navbar-container">
          <img src={icon} alt="" id="icon"/>
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> GrizzlyCave </Link>
          <div className='menu-icon' onClick ={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          {isLoggedIn ? (
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