 import React from 'react'
 import {HashLink as Link} from 'react-router-hash-link';

function Navbar() {
    const [click, setClick] = useState(false), handleClick = () => setClick(!click), closeMobileMenu = () => setClick(false);
    return (
        <div id="nav-wrapper">
            <nav id="nav">
                <div className="navleft">
                    <span logo="logo"><h3><Link to="/">GrizzlyCave</Link></h3></span>
                    <button><span class="fas fa-bars"></span></button>
                </div>

                <div className="navright">
                    <Link to="" smooth>
                        <span className="nav-span-link">

                        </span>
                    </Link>
                    <Link to="" smooth>
                        <span className="nav-span-link">

                        </span>
                    </Link>
                    <Link to="" smooth>
                        <span className="nav-span-link">

                        </span>
                    </Link>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
