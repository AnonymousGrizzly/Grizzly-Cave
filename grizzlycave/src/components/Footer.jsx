import React from 'react'
import '../designs/Footer.css';


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
                    <a href="#"><i className="fa-brands fa-github"></i></a>
                    <a href="#"></a>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default Footer