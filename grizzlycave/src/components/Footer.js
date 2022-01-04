import React from 'react';
import '../designs/Footer.css';
import { HashLink as Link} from 'react-router-hash-link';

function Footer() {
  return (
    <div className='footer-container'>
        <div className="change2-cntnr"></div>
      <div className='footer-links'>
        
      </div>
      <section className='social-media'>

        <div className='social-media-wrap'>
          <div className="">
          <Link to="#home" smooth className="social-logo">GrizzlyCave</Link>
            <div className='footer-logo'>
            </div>
          </div>
            
          <small className='website-rights'>Maks Rogelj, GrizzlyCave © 2022</small>
          <div className='social-icons'>
            <a className='social-icon-link facebook' href='https://www.facebook.com/picto.design.ljubljana' aria-label='Facebook'>
              <i className='fab fa-facebook-f' />
            </a>
            <a className='social-icon-link instagram' href='https://www.instagram.com/go_picto/' aria-label='Instagram' >
              <i className='fab fa-instagram' />
            </a>
            <a className='social-icon-link youtube' href='/' aria-label='Youtube'>
              <i className='fab fa-youtube' />
            </a>
            <a className='social-icon-link twitter' href='https://www.google.com/maps/place/Picto.design/@46.0574263,14.5073083,17z/data=!3m1!4b1!4m5!3m4!1s0x477acc9417577119:0x9a591440b9a9dd86!8m2!3d46.0574586!4d14.5094956' aria-label='Twitter'>
              <i className="fas fa-map-marker-alt"/>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;