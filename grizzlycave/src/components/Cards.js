import Aos from 'aos'
import "aos/dist/aos.css"
import React, {useEffect} from 'react'
import "../designs/Cards.css"
import {Button} from "./Button"
import GrizzlyFeet from "../images/GrizzlyFeet.png";

export default function Cards() {
    useEffect(() => { Aos.init({duration:1000}); }, []);
    return (
        <div className="cards">
            <img id="GrizzlyFeet" src={GrizzlyFeet} alt=""/>
            <div className="card-cntnr"> 
                <section className="aboutus-cntnr">
                    <h2>About Us</h2>
                    <p>This is a web app, where you can store and/or send any files. Set a password and expiry date, along with a message of what kind of file it is.
                         If you want to send a super secret message without a file, you can do it here too!
                         It also functions as a storage for passwords.</p>
                </section>
                <section className="howto-cntnr">
                    <h2>How to use</h2>
                    <p>Simply follow the suggested input forms and you'll be fine. </p>
                </section>
                <section className="newfeatures-cntnr">
                    <h2>Check out new things we added!</h2>
                    <p>There are weekly updates on my web app. If you want to know what's up, click on the button bellow!</p>
                    <Button className="btns" where="/features" buttonSize="btn-large" buttonStyle="btn--signup">Updates</Button>
                </section>
            </div>
        </div>
    )
}


