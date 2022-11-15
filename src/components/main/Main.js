import Login from './Login.js';
import Post from './Post.js';
import Signup from './Signup.js';
import {useState} from 'react';


const Main = ({setUserInfo})=>{
  const [showMain, setShowMain] = useState([true, false, true]) //login, signup, posts
  return (
    <div className="main">
      <h1>{}</h1>
      {showMain[0] ? <Login setShowMain={setShowMain} setUserInfo={setUserInfo}/>: null}
      {showMain[1] ? <Signup setShowMain={setShowMain} setUserInfo={setUserInfo}/>: null}
      {showMain[2] ? <Post />: null}
    </div>
  )
}

export default Main;