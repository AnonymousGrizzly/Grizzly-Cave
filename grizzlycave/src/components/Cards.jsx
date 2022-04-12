import Aos from 'aos'
import "aos/dist/aos.css"
import React, {useEffect} from 'react'
import "../styles/Cards.css"
import GrizzlyFeet from "../images/GrizzlyFeet.png";
import {HashLink as Link} from 'react-router-hash-link';
import { Info, Shield, Coffee } from 'react-feather';

export default function Cards() {
    useEffect(() => { Aos.init({duration:1000}); }, []);
    return (
        <div className="cards">
            <img src={GrizzlyFeet} alt=""/>
            <div className="card-cntnr"> 
                <div id="AboutUs" className='section'>
                    <h2 className='icon'><Info size="28" />&nbsp; About Us </h2>
                    <p>
                        This is a web app for storing and sending files. <br/>
                        To start, click on the button "Sign Up/In"
                        or the buttons on the hero section to proceed to the login/signup page to create or use your account.<br/>
                        If you need help or if you want to contact us, feel free to check the contact us form down below. <br/>
                        For more information, click on the buttons in the footer section.
                    </p>
                </div>
                <div className='section'>
                    <h2 className='icon'>Security &nbsp;<Shield size="30"/></h2>
                    <p> 
                        Don't worry about other people trying to read your stuff. Focus on your work and leave security to us!<br/>    
                        This web app is well secured with many ways to battle sql injections, backdoor entrances and other hacks.<br/>
                        With the help of regular expressions we even avoid client based errors, with passwords needing to be complex and users needing to relogin after 6 hours.<br/>
                        It's still a new web app, so we are still programming new ways to secure our application. To read more about what we add every day, check out our news page!
                    </p>
                </div>
                <div className='section'>
                    <h2 className='icon'><Coffee size="28"/>&nbsp; Check out new things we added!</h2>
                    <p>
                        Our app is still new, so there are daily updates to make your stay in our cave more comfortable.<br/>
                        If you want to know what's up, click on the button bellow!
                        <br/><br/>
                    </p>
                    <Link   to="/news" className="secondary-btn" >News <i className="fas fa-long-arrow-alt-right"></i></Link>
                </div>
            </div>
        </div>
    )
} 