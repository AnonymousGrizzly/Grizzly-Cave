import React from 'react'
import '../styles/NotFound.css'
import { useHistory } from 'react-router';

function NotFound() {
    const history = useHistory();
    const onClick=()=>{
        history.push("/");
    }

  return (
    <div className='notfound-cntnr' onClick={onClick}>
        <div className='notfound-wrapper'>
            <p>- Wrong cave! -</p>
            <h1>404: Page not found</h1>
        </div>
    </div>
  )
}

export default NotFound