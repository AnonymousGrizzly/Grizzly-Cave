import React from "react";
import "../App.css";
import Herosection from "../components/HeroSection";
import Cards from "../components/Cards";
import Footer from "../components/Footer"
import ContactForm from "../components/ContactForm";

export default function Home(){
    return (
     <>
        <div id="home_body">
            <Herosection/>
            <Cards/>
            <ContactForm/>
        </div>
     </>
    )
}