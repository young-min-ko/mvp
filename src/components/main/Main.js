import Login from './Login.js';
import Post from './Post.js';
import Signup from './Signup.js';
import WritePost from './WritePost.js'
import SearchResults from './SearchResults.js'
import {useState} from 'react';


const Main = ({userInfo, setUserInfo, currentPage, setCurrentPage, postlist})=>{
  const [showMain, setShowMain] = useState([false, true, false])
  // onclick
  const postOnClick = ()=>{
    setShowMain([false, false, true])
  }
  return (
    <div className="main">
      <h1>{currentPage[0]}</h1>
      {currentPage[2].map((result)=>{
        return <SearchResults result={result} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      })}
      {Object.keys(userInfo).length !== 0 ? <button onClick={postOnClick}>post something</button> : null}
      {Object.keys(userInfo).length === 0 && !showMain[0]? <Login setShowMain={setShowMain} setUserInfo={setUserInfo}/>: null}
      {showMain[0] ? <Signup setShowMain={setShowMain} setUserInfo={setUserInfo}/>: null}
      {showMain[1] ? postlist.map(post=>{
        return <Post post={post} />;
      }) : null}
      {showMain[2] && Object.keys(userInfo).length !== 0 ? <WritePost userInfo={userInfo} setShowMain={setShowMain}/>: postlist.map(post=>{
        return <Post post={post} />;
      })}

    </div>
  )
}

export default Main;