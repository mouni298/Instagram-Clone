import { useEffect, useState } from 'react';
import './App.css';
import { collection, onSnapshot } from 'firebase/firestore';
import Post from './Post'
import PostUpload from './PostUpload'
import { Input,Button, Modal, Box } from '@mui/material';
import {createUserWithEmailAndPassword,updateProfile,signOut,signInWithEmailAndPassword} from "firebase/auth";
import {db,auth,storage} from "./firebase";

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
  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [email,setEmail] = useState(null);
  const [username,setUsername] = useState(null);
  const [password,setPassword] = useState(null);
  const [user,setUser] = useState(null);
  const [openSignIn,setOpenSignIn] = useState(false);
  

  const handleModal = ()=>setOpen(true)
  const handleSignInModal = ()=>setOpenSignIn(true)

  useEffect(()=>{
    const unsubscribe = onSnapshot(collection(db,posts),(snapshot)=>{
      setPosts(snapshot.docs.map((doc)=>({post:doc.data(),id:doc.id})))
    })
    return ()=> unsubscribe();
  },[]);

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        console.log(authUser)
        setUser(authUser)
      }
      else{
        setUser(null)
      }
    })
  })

  const signup = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth,email,password)
    .then((authUser)=>{
      return updateProfile(authUser.user,{
        displayName:username,
      });
    })
    .catch((error)=>alert(error.message))
    setOpen(false);
  }

  const signin = (event)=>{
    event.preventDefault();
    signInWithEmailAndPassword(auth,email,password)
    .catch((errror)=>alert(error.message))
    setOpenSignIn(false)
  }
  
  return (
    <div className="app">
      {user?.displayName ?
      (<PostUpload username={user.displayName}/>):
      (<h3>Sorry, you need to login to upload</h3>)}
      <div className='app_header'>
        <img 
        className='app_headerImage'
        src = "https://clipart.info/images/ccovers/1559063345Instagram-logo-.png"
        alt="instagram"
        />
        {user ?
        (<Button onClick={()=>signOut(auth)}>Logout</Button> ) :
        (<div>
        <Button onClick={handleSignUpModal}>Sign up</Button>
        <Button onClick={handleSignInModal}>Sign In</Button>
        </div>)}
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
            <Input type = "text" placeholder='pasword' value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
            <Button onClick = {signup}>Sign Up</Button>
            </form>
          </center>
        </Box>
      </Modal>
      <Modal open= {openSignIn} onClose={()=>setOpenSignIn(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
        <Box sx={style}>
          <center>
            <img src="https://clipart.info/images/ccovers/1559063345Instagram-logo-.png" alt="insta" style={{width:'100px',height:'50px'}}/>
            <form className='modal__form'>
            <Input type = "text" placeholder='email' value={caption} onChange={(e)=>setEmail(e.target.value)}></Input>
            <Input type = "text" placeholder='pasword' value={password} onChange={(e)=>setPassword(e.target.value)}></Input>
            <Button onClick = {signin}>Sign In</Button>
            </form>
          </center>
        </Box>
      </Modal>
    {posts.map(({post,id})=><Post key={id} username={post.username} imgUrl={post.imgUrl} caption={post.caption}/>)}
    </div>
  );
}

export default App;
