import React from 'react';
import '../designs/Footer.css';
import { HashLink as Link} from 'react-router-hash-link';

function Footer() {
  return (
    <div class="footer-distributed">
      <div class="footer-right">
        <a href="#"><i class="fa fa-facebook"></i></a>
        <a href="#"><i class="fa fa-twitter"></i></a>
        <a href="#"><i class="fa fa-linkedin"></i></a>
        <a href="#"><i class="fa fa-github"></i></a>
      </div>
      <div class="footer-left">
        <p class="footer-links">
          <a class="link-1" href="#">Home</a>
          <a href="#">News</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>
        <p>GrizzlyCave &copy; 2022</p>
      </div>
    </div>
  )
}

export default Footer;