import Login from './Login.js';
import Post from './Post.js';
import Signup from './Signup.js';
import {useState} from 'react';


const Main = ()=>{
  const [showMain, setShowMain] = useState([true, false, true]) //login, signup, posts
  return (
    <div className="main">
      {!showMain[0] ? <Login />: null}
      {!showMain[1] ? <Signup />: null}
      {showMain[2] ? <Post />: null}
    </div>
  )
}

export default Main;