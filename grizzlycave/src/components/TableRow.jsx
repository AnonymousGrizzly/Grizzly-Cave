import React from 'react'
import {Folder, File, MoreVertical, MoreHorizontal} from 'react-feather'

function TableRow({Name, onClick, lastModified, fileSize, folder, showMore, index, id, back, parent}) {
 
  const fFolder = (!!parent); 
  return (
    <>
    { fFolder && (
      <tr className='first-folder'>
        <td onClick={()=> onClick(parent)}><MoreHorizontal size="20"/></td>
        <td onClick={()=> onClick(parent)}></td>
        <td onClick={()=> onClick(parent)}></td>
        <td onClick={()=> onClick(parent)}></td>
        <td onClick={()=> onClick(parent)}></td>
      </tr>
    )}
    <tr key={index}>
        <td onClick={() => onClick(id, Name)}>{folder ? (<Folder size="20"/>) : (<File size="20"/>)}</td>
        <td onClick={() => onClick(id, Name)}>{Name}</td>
        <td onClick={() => onClick(id, Name)}>{lastModified}</td>
        <td onClick={() => onClick(id, Name)}>{fileSize}</td>
        <td onClick={() => showMore()}><MoreVertical  size="20"/></td>     
    </tr>
    </>
  )
}

export default TableRow;