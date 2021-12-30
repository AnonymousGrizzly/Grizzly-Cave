import React, {useState, useEffect, useContext} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import '../designs/Navbar.css';

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
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}> Grizzly Cave </Link>
          <div className='menu-icon' onClick ={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link smooth to='#home' className='nav-links' onClick={closeMobileMenu}> Home </Link>
            </li>
            <li className='nav-item'>
              <Link smooth to='#Partners' className='nav-links' onClick={closeMobileMenu}> Partners </Link>
            </li>   
            <li className='nav-item'>
              <Link smooth to='#ContactUs' className='nav-links' onClick={closeMobileMenu}> Contact Us </Link>
            </li>
            <li className='nav-item'>
              <Link smooth to="#AboutUs" className='nav-links' onClick={closeMobileMenu}> About Us </Link>
            </li>
            <li className='nav-item'>
              <Link smooth to='/login' className='nav-links-mobile' onClick={closeMobileMenu}> LOG IN </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
}

export default Navbar
