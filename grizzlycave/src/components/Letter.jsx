import React from 'react'
import {Mail} from 'react-feather'
import "../styles/Letter.css"

function Letter({onClick, Name, id}) {
    return (
        <div onClick={()=>onClick(id, Name)} className="letter">
            <div className='icon'>
                <Mail size="20"/> {' '}
            </div>
            <div className='letter-name'>
            {Name}
            </div>
            
        </div>
    )
}

export default Letter
