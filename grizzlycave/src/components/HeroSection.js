import React from 'react'
import "../designs/HeroSection.css"
import {Button} from "./Button"
import btwnsection from "../images/Between-section.png"
import HeroImg from "../images/Grizzly.png"

export default function HeroSection() {
//               <img src={HeroImg} alt=""/>
    return (
        <div className="hero-cntnr" id="Home">
            <div className="hero-wrapper">
            <h1> A safe place for your files</h1>
            <p> operate with files safely. </p>
            <img src={HeroImg} alt="Grizzly Cave" id="HeroImg"/>
            <div className="hero-btns">
                
            </div>
            <div className="change-cntnr"></div> 
            </div>
            
        </div>
        
    )
}

 