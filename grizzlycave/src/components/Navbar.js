 import React, {useState, useEffect, useContext} from 'react';
 import {FaBars} from "react-icons/fa";
 import {HashLink as Link} from 'react-router-hash-link';

function Navbar() {
    
    const [showLinks, setShowLinks] = useState(false);
    const linkscntnrRef =useRef(null);
    const linksRef = useRef(null);
    const toggleLinks =()=>{
        setShowLinks(!showLinks);
    }
    useEffect(()=> {
        const linksHeight = linksRef.current.getBoundingClientRect().height;
        if(showLinks){
            linkscntnrRef.current.style.height = `${linksHeight}px`;
        }else{
            linkscntnrRef.current.style.height = `0px`;
        }
    }, )
    return (
        <nav>
      <div className='nav-center'>
        <div className='nav-header'>
          <img src={logo} className='logo' alt='logo' />
          <button className='nav-toggle' onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className='links-cntnr' ref={linkscntnrRef}>
          <ul className='links' ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
    )
}

export default Navbar
