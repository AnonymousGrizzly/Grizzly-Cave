import React from 'react'
import '../styles/News.css'

function NewsItem({index, created_at, title, p1, p2}) {
  return (
    <div className='news-item' key={index}>
        <h3>{title}</h3>
        <p className='small'>{created_at}</p>
        <p className='body'>{p1}</p>
        <p className='body'>{p2}</p>
    </div>
  )
}

export default NewsItem