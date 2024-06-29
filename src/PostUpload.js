import { Button, Input } from '@mui/material'
import React, { useState } from 'react'
import {db,storage} from './firebase'
import { getDownloadURL,ref,uploadBytesResumable } from 'firebase/storage';
import {collection} from 'firebase/firestore';
import firebase from 'firebase/compat/app'

function PostUpload({username}) {
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
      const storageRef = ref(storage,`images/${image.name}`)
      const uploadTask = uploadBytesResumable(storageRef,image);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100);
          console.log('Upload is '+ progress + '% done');
          setProgress(progress)
        },
        (error) => {
          alert.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            collection(db,'posts').add(
              {
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: downloadURL,
                username: username
              }
            );
            setCaption("");
            setImage(null);
            setProgress(0)
          });
        }
      )       
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
