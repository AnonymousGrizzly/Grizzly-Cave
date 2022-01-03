import React from 'react';
import emailjs from '@emailjs/browser';
import '../designs/ContactForm.css';


export default function ContactForm() {
  function sendEmail(e) {
    e.preventDefault();
    emailjs.sendForm('service_7bw3ypg', 'template_pjtvv4s', e.target, 'user_Gs5hL6Zeeq6azeTc0ccJB')
      .then((result) => {
          console.log(result.text);
          alert("Message sent!");
      }, (error) => {
          console.log(error.text);
          alert("An error occured!");
      });
      e.target.reset(); 
  }
  
  function validateEmail(user_email){ //Must contain @, can't be shorter than 8 characters
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(user_email);
  }
  let user_email = document.getElementById("user_email");
  let valid= validateEmail(user_email);
  console.log(valid);

  return (
    <form className="contact-form" onSubmit={sendEmail}>
        <h1 id ="ContactUs">Contact us <i class="far fa-envelope"></i></h1>
        <p>-  We'd love to hear from you! - </p>
        <input type="text" name="user_name" id="user_name" placeholder="Name or Company"  required/>
        <input type="email" name="user_email" id="user_email" placeholder="Email" clasname="field" required/>
        <textarea name="user_message" id="user_message" placeholder="        How can we help you?" required />
        <p><i class="fas fa-user-lock"></i> we NEVER share your email with anyone</p>
        <input data-aos="fade-up" type="submit" value="Send"  className="submit-btn"/>
    </form>
    
  );
}