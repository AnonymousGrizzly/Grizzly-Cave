import React from "react";
import "../designs/News.css";
import {Coffee} from 'react-feather';

export default function News(){
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    let difference = +new Date(`10/01/${year}`) - +new Date();
  
    let timeLeft = {};
  
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }
  
    return timeLeft;
  }
    return (
     <>
        <div className="news-cntnr">
          <div className="news-wrapper">
            <h1>News &ensp; <Coffee size="38" /> </h1>
            <hr/>
            <div className="news-blocks">
              <p>Time left till push:</p>
              
            </div>
          </div>
        </div>
     </>
    )
}