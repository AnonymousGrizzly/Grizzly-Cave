 import React, {useState, useEffect, useRef} from 'react';
 import FaBars from "../images/menu.svg";
 import Logo from "../images/Grizzly.png"
 import {HashLink as Link} from 'react-router-hash-link';

function Navbar() {
    
    const [showLinks, setShowLinks] = useState(false);
    const linkscntnrRef =useRef(null);
    const linksRef = useRef(null);
    const toggleLinks =()=>{
        setShowLinks(!showLinks);
    }
    
    return (
        <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={Logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-cntnr' ref={linkscntnrRef}>
          <ul className="links">
            <li>
             {/*  
              Put in whatever you need
             */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
