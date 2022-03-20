import React from 'react'
import '../designs/Footer.css';
import { GitHub, Instagram } from 'react-feather';



function Footer() {
  return (
    <div>
        <div className='footer-cntnr'>
            <div className='footer-distributed'>
            <div className='footer-left'>
                  <p> Copyright © 2022 All Rights Reserved</p>
                </div>
                <div className='footer-centered'>
                  <p>Maks Rogelj, GrizzlyCave 2022 </p>
                </div>
                <div className='footer-right'>
                    <a href="https://github.com/AnonymousGrizzly/GrizzlyCave"><GitHub /></a>
                    <a href="https://www.instagram.com/anonymousgrizzly/"><Instagram /></a>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default Footer