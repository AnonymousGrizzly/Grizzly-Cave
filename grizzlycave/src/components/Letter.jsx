import React from 'react'
import {Mail} from 'react-feather'

function Letter({onClick, Name, id}) {
    return (
        <div onClick={()=>onClick(id, Name)} className="letter">
            <div className='icon'>
                <Mail size="20"/>
            </div>
            {Name}
        </div>
    )
}

export default Letter
