import { Avatar } from '@mui/material/Avatar'
import React from 'react'
import './Post.css'

function Post({username,imgUrl,caption}) {
  return (
    <div className='post'>
        <div className='post__header'>
            <Avatar className="post__avatar" alt="{username}" src="/static/1.jpg" />
            <h4>{username}</h4>
        </div>
        <img 
        className='post__image'
        src={imgUrl}
        alt=""
        />

        <h4 className='post__caption'><strong>{username}</strong>{caption}</h4>
      
    </div>
  )
}

export default Post
