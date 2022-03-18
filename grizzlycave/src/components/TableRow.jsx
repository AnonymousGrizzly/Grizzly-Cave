import React from 'react'
import {Folder, File, MoreVertical} from 'react-feather'

function TableRow({Name, onClick, lastModified, fileSize, folder, showMore, index}) {
  return (
    <tr key={index}>
        <td onClick={onClick}>{folder ? (<Folder size="20"/>) : (<File size="20"/>)}</td>
        <td onClick={onClick}>{Name}</td>
        <td onClick={onClick}>{lastModified}</td>
        <td onClick={onClick}>{fileSize}</td>
        <td onClick={showMore}><MoreVertical  size="20"/></td>     
    </tr>
  )
}

export default TableRow