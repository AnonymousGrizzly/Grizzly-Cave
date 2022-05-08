import React, { Suspense } from "react";
import "../styles/News.css";
import {Coffee} from 'react-feather';


export default function News(){
  const NewsItem = React.lazy(()=>import("../components/NewsItem"));
  return (
    <>
       <div className="news-cntnr">
         <div className="news-wrapper">
           <h1>News &ensp; <Coffee size="38" /> </h1>
           <hr/>
           <div className="news-blocks">
             <br/>
             <Suspense fallback={<p className="centered-p">Loading . . .</p>}>
             <NewsItem
              title= "Updated UI"
              p1 = {"Updated UI in Storage and Mail. Now it should be easier to use."}
              p2 = {""}
              created_at={"02-05-2022"}
            />
            <NewsItem
              title = "Bug fixes"
              created_at={"02-05-2022"}
              p1 = {"Various bug fixes in Profile and Mail. If you find any new bugs, contact us from our home page. Thank you!"}
            />
             </Suspense>
           </div>
         </div>
       </div>
    </>
  )
}