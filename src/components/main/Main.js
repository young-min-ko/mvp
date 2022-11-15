import Login from './Login.js';
import Post from './Post.js';
import Signup from './Signup.js';
import {useState} from 'react';


const Main = ()=>{
  const [showMain, setShowMain] = useState([true, false, true]) //login, signup, posts
  const [loginStatus, setLoginStatus] = useState(false);
  return (
    <div className="main">
      {showMain[0] ? <Login setShowMain={setShowMain} setLoginStatus={setLoginStatus}/>: null}
      {showMain[1] ? <Signup setShowMain={setShowMain} showMain={showMain} setLoginStatus={setLoginStatus}/>: null}
      {showMain[2] ? <Post />: null}
    </div>
  )
}

export default Main;