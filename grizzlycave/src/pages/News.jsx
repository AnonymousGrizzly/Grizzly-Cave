import React from "react";
import "../styles/News.css";
import {Coffee} from 'react-feather';

export default function News(){
    return (
     <>
        <div className="news-cntnr">
          <div className="news-wrapper">
            <h1>News &ensp; <Coffee size="38" /> </h1>
            <hr/>
            <div className="news-blocks">
              <br/>
              <p>The app has just been started. We will write the news here, when there while be some!</p>
            </div>
          </div>
        </div>
     </>
    )
}