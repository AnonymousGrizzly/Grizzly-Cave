import React, {useState, useEffect} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import '../designs/Navbar.css';
import icon from "../images/encryption-white.png";

function Navbar() {
    const [click, setClick] = useState(false), handleClick = () => setClick(!click), closeMobileMenu = () => setClick(false);
    const [button, setButton] = useState(true);
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false);
        }else{
            setButton(true);
        }
    }
    useEffect  (()=>{ 
        showButton();
    }, []);
    window.addEventListener('resize', showButton);
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
              <Link smooth to={'/'} className='nav-links' onClick={closeMobileMenu}> Home </Link>
            </li>
            <li className='nav-item'>
              <Link smooth to='#AboutUs' className='nav-links' onClick={closeMobileMenu}> About </Link>
            </li>   
            <li className='nav-item'>
              <Link smooth to="#ContactUs" className='nav-links' onClick={closeMobileMenu}> Contact Us </Link>
            </li>
            <li className='nav-item'>
              <Link smooth to='/news' className='nav-links' onClick={closeMobileMenu}> News </Link>
            </li>
            <li className='nav-item'>
              <Link smooth to='/signup' className='nav-links' onClick={closeMobileMenu}> Sign Up/In </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar