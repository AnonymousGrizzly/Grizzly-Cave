import Aos from 'aos'
import "aos/dist/aos.css"
import React, {useEffect} from 'react'
import "../designs/Cards.css"
//import {Button} from "./Button"
import GrizzlyFeet from "../images/GrizzlyFeet.png";

export default function Cards() {
    useEffect(() => { Aos.init({duration:1000}); }, []);
    return (
        <div className="cards">
            <img src={GrizzlyFeet} alt=""/>
            <div className="card-cntnr"> 
                <section className="aboutus-cntnr">
                    <h2>About Us</h2>
                    <p>This is a web app, where you can store and/or send any files.
                        <br/> Set a password and expiry date, along with a message of what kind of file it is.
                        <br/>If you want to send a super secret message without a file, you can do it here too!
                        <br/>It also functions as a storage for passwords.</p>
                </section>
                <section className="howto-cntnr">
                    <h2>Security</h2>
                    <p> 
                        Don't worry about other people trying to read your stuff. Focus on your work and leave security to us!
                        <br/>    
                        <br/>First of all, it uses https to load your page, which means any data you type into this site is not sent to our server in plaintext, which helps protecting your data on the journey to the safe grizzlycave.
                        <br/>You can try to guess your password only a few times, before grizzly decides you are trying to break in.
                        <br/> Database is protected by blobfish, passwords are encripted by differend salts and you can even chose what enryption do you want to use for your messages!
                    </p>
                </section>
                <section className="newfeatures-cntnr">
                    <h2>Check out new things we added!</h2>
                    <p>
                        There are weekly updates on our web app. If you want to know what's up, click on the button bellow!
                        <br/>
                    </p>
                    
                </section>
            </div>
        </div>
    )
}


