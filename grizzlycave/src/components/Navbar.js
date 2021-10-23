import React, {useState, useEffect, useContext} from 'react';
import {HashLink as Link} from 'react-router-hash-link';
import {Button} from './Button';
import '../design/Navbar.css';
import AuthContext from "../contexts/auth-context";

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
   
    //const authCtx = useContext(AuthContext);
    const isLoggedIn = /*authCtx.isLoggedIn*/Boolean(false);
    window.addEventListener('resize', showButton);

    return (
      <nav className="navbar">
      <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              GrizzlyCave
          </Link>
          <div className='menu-icon' onClick ={handleClick}>
              <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            {!isLoggedIn && (
              <li className='nav-item'>
              <Link smooth to='#home' className='nav-links' onClick={closeMobileMenu}>
                  Home
              </Link>
            </li> ) && (
              <li className='nav-item'>
              <Link smooth to='#AboutUs' className='nav-links' onClick={closeMobileMenu}>
                  AboutUs
              </Link>
            </li>  ) && (              
              <li className='nav-item'>
              <Link smooth to='#ContactUs' className='nav-links' onClick={closeMobileMenu}>
                  Contact Us
              </Link>
          </li>  ) && (      
              <li className='nav-item'>
              <Link smooth to='/login' className='nav-links-mobile' onClick={closeMobileMenu}>
                  LOG IN
              </Link>
          </li> )}  
            {isLoggedIn && (
              <li className='nav-item'>
                <Link smooth to='#home' className='nav-links' onClick={closeMobileMenu}>
                  Website Home
              </Link>
            </li> ) && (
              <li className='nav-item'>
                <Link smooth to='#home' className='nav-links' onClick={closeMobileMenu}>
                  Home
              </Link>
              </li>
            )}
          </ul>
          {isLoggedIn && (
            <Button buttonStyle='btn--signup'>
            LOG IN
            </Button>
          )}
          
      </div>
  </nav>
    )
}

export default Navbar