import { useEffect, useState } from 'react';
import './App.css';
import { collection, onSnapshot } from 'firebase/firestore';
import Post from './Post'
import { Input,Button, Modal, Box } from '@mui/material';

const style={
  position: 'absolute',
  top:'50%',
  left:'50%',
  transform: 'translate(-50%,-50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid lightgray',
  boxShadow: 24,
  p: 4,
  outline: 0,
}

function App() {
  const [posts,setPosts] = useState([])
  const [open,setOpen] = useState(false);

  const handleModal = ()=>setOpen(true)

  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db,posts),(snapshot)=>{
      setPosts(snapshot.docs.map((doc)=>({post:doc.data(),id:doc.id})))
    })
    return ()=> unsubscribe();
  },[]);

  const signup = (e)=>{
    e.preventDefault();
    setOpen(false);

  }

  return (
    <div className="app">
      <div className='app_header'>
        <img 
        className='app_headerImage'
        src = "https://clipart.info/images/ccovers/1559063345Instagram-logo-.png"
        alt="instagram"
        />
      </div>
      <Modal open= {open} onClose={()=>setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
          <center>
            <img src="https://clipart.info/images/ccovers/1559063345Instagram-logo-.png" alt="insta" style={{width:'100px',height:'50px'}}/>
            <form className='modal__form'>
            <Input type = "text" placeholder='email' value={caption} onChange={(e)=>setEmail(e.target.value)}></Input>
            <Input type = "text" placeholder='username' value={caption} onChange={(e)=>setUsername(e.target.value)}></Input>
            <Input type = "text" placeholder='pasword' value={password} onChange={(e)=>setPasswors(e.target.value)}></Input>
            <Button onClick = {signup}>Sign Up</Button>

            </form>
          </center>

        </Box>
      </Modal>
    {posts.map(({post,id})=><Post key={id} username={post.username} imgUrl={post.imgUrl} caption={post.caption}/>)}
    </div>
  );
}

export default App;
