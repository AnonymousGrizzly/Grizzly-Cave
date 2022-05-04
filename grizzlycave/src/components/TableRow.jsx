import React from 'react'
import {Folder, File, MoreVertical, MoreHorizontal} from 'react-feather'

function TableRow({Name, onClick, lastModified, fileSize, folder, showMore, index, id, back}) {
 
  const fFolder = (index == 0);

  return (
    <>
    { fFolder && (
      <tr className='first-folder'>
        <td onClick={()=>{back(id, Name)}}><MoreHorizontal size="20"/></td>
        <td onClick={()=>{back(id, Name)}}></td>
        <td onClick={()=>{back(id, Name)}}></td>
        <td onClick={()=>{back(id, Name)}}></td>
        <td onClick={()=>{back(id, Name)}}></td>
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