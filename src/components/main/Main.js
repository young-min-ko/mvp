import Login from './Login.js';
import Post from './Post.js';
import Signup from './Signup.js';
import WritePost from './WritePost.js'
import SearchResults from './SearchResults.js'
import axios from 'axios';
import {useState} from 'react';


const Main = ({userInfo, setUserInfo, currentPage, setCurrentPage, postlist, getPosts})=>{
  const [showMain, setShowMain] = useState([false, true, false])
  // onclick
  const postOnClick = ()=>{
    setShowMain([false, false, true])
  }

  const joinOnClick = ()=>{
    if (Object.keys(userInfo).length === 0){
      alert('please login to join a community');
      return;
    }
    let body = {user_id: userInfo.id, community_id: currentPage[1]};
    axios.post('/join', body)
    .then((res)=>{
      console.log(res);
    })
    .catch(err=>{
      console.log(err);
    })
  }
  return (
    <div className="main">
      <div className="forum-name">{currentPage[0]}{currentPage[1] !== 0 ? <button className="join-button" onClick={joinOnClick}>join+</button>: null}</div>
      {currentPage[2].length !== 0 ?<h3 className="search-result-title">Search Results:</h3>: null}
      {currentPage[2].map((result)=>{
        return <SearchResults result={result} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      })}
      {Object.keys(userInfo).length !== 0 && currentPage[1] !== 0 ? <button onClick={postOnClick}>post something</button> : null}
      {Object.keys(userInfo).length === 0 && !showMain[0]? <Login setShowMain={setShowMain} setUserInfo={setUserInfo}/>: null}
      {showMain[0] ? <Signup setShowMain={setShowMain} setUserInfo={setUserInfo}/>: null}
      {showMain[1] ? postlist.map(post=>{
        return <Post post={post} />;
      }) : null}
      {showMain[2] && Object.keys(userInfo).length !== 0 ? <WritePost getPosts={getPosts} userInfo={userInfo} setShowMain={setShowMain} currentPage={currentPage}/>: null}
    </div>
  )
}

export default Main;