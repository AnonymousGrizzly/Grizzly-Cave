import Aos from 'aos'
import "aos/dist/aos.css"
import React, {useEffect} from 'react'
import "../designs/Cards.css"
import GrizzlyFeet from "../images/GrizzlyFeet.png";
import {HashLink as Link} from 'react-router-hash-link';

export default function Cards() {
    useEffect(() => { Aos.init({duration:1000}); }, []);
    return (
        <div className="cards">
            <img src={GrizzlyFeet} alt=""/>
            <div className="card-cntnr"> 
                <section id="AboutUs">
                    <h2><i className="fas fa-id-card"></i> About Us </h2>
                    <p>
                        This is a web app, where you can store and/or send any files.
                        <br/> Set a password and expiry date, along with a message of what kind of file it is.
                        <br/>If you want to send a super secret message without a file, you can do it here too!
                        <br/>It also functions as a storage for passwords.</p>
                </section>
                <section >
                    <h2>Security <i className="fas fa-shield-alt"></i></h2>
                    <p> 
                        Don't worry about other people trying to read your stuff. Focus on your work and leave security to us!
                        <br/>    
                        <br/>First of all, it uses https to load your page, which means any data you type into this site is not sent to our server in plaintext, which helps protecting your data on the journey to the safe grizzlycave.
                        <br/>You can try to guess your password only a few times, before grizzly decides you are trying to break in.
                        <br/> Database is protected by bcrypt, passwords are encripted by different salts and you can even chose what enryption do you want to use for your messages!
                    </p>
                </section>
                <section >
                    <h2><i className="fas fa-newspaper"></i> Check out new things we added!</h2>
                    <p>
                        There are weekly updates on our web app. If you want to know what's up, click on the button bellow!
                        <br/><br/>
                    </p>
                    <Link   to="/news" className="secondary-btn" >News <i className="fas fa-long-arrow-alt-right"></i></Link>
                </section>
            </div>
        </div>
    )
}


