import React from "react";
import "../designs/Footer.css"
import {Hashlink as Link} from "react-router-hash-link";

function Footer() {

    return (
        <div className="footer-cntnr">
            <div className="footer-links">
                <div className="footer-link-wrapper">
                    <div className="footer-link-items">
                        <h2>About us</h2>
                        <Link to="/signup" > Signup </Link>
                        <Link to="/"> Terms of Service </Link>
                        <Link to="/"> Terms of using my service</Link>
                        <Link to="/"> Terms of not using my service</Link>
                    </div>
                    <div className="footer-link-items">
                        <h2>Contact us</h2>
                        <Link to=""> Contact1 </Link>
                        <Link to=""> Contact2 </Link>
                        <Link to=""> Contact3 </Link>
                    </div>
                </div>
                

            </div>
        </div>
    )
}

export default Footer
