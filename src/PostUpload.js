import { Button, Input } from '@mui/material'
import React, { useState } from 'react'

function PostUpload(username) {
    const [caption,setCaption] = useState('')
    const [progress,setProgress] = useState(0)
    const [image,setImage] = useState(null)

    const handleChange = (event)=>{
        if(event.target.files[0]){
            console.log(event.target.files[0])
            setImage(event.target.files[0]);
        }
    }

    const handleUpload = ()=>{
        
    }


  return (
    <div className='post__upload'>
        <Input type= "file" onChange={handleChange}></Input>
        <progress value = {progress} max="100" />
        <Input type = "text" placeholder='Enter a caption' value={caption} onChange={(e)=>setCaption(e.target.value)}></Input>
        <Button onClick = {handleUpload}>Upload</Button>
      
    </div>
  )
}

export default PostUpload
