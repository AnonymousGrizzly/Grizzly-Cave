import React from "react";
import "../designs/News.css";
import {Coffee} from 'react-feather';

export default function News(){
    return (
     <>
        <div className="news-cntnr">
          <div className="news-wrapper">
            <h1>News &ensp; <Coffee size="38" /> </h1>
            <hr/>
            <div className="news-blocks">
              
            </div>
          </div>
        </div>
     </>
    )
}