import React from 'react'
import '../designs/Footer.css';


function Footer() {
  return (
    <div>
        <div className='footer-cntnr'>
            <div className='footer-distributed'>
                <div className='footer-right'>
                    <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    <a href="#"><i className="fa-brands fa-github"></i></a>
                </div>

                <div className='footer-left'>
                  <p> Copyright © 2022 All Rights Reserved by Maks Rogelj</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Footer