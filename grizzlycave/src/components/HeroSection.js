import React from 'react'
import "../designs/HeroSection.css"
import {Button} from "./Button"
import btwnsection from "../images/Between-section.png"
//import HeroImg from "../images/HeroSection.png"

export default function HeroSection() {
//               <img src={HeroImg} alt=""/>
    return (
        <div className="hero-cntnr" id="Home">
            <h1> A safe place for your files</h1>
            <p> operate with files safely. </p>
            <div className="hero-btns">
                <Button className="btns" where="#start" buttonSize="btn-large" buttonStyle="btn-primary">About Us</Button> 
                <Button className="btns" where="/login" buttonSize="btn-large" buttonStyle="btn-outline">Sign Up</Button>
            </div>

            <div className="change-cntnr"></div> 
        </div>
        
    )
}

 