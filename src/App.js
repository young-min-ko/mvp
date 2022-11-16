import {useState, useEffect} from 'react';
import axios from 'axios';
import './style/style.css';
import Navbar from './components/navbar/Navbar.js';
import Profile from './components/profile/Profile.js';
import TopCommunity from './components/top-community/TopCommunity.js';
import Main from './components/main/Main.js';


function App() {
  const [userInfo, setUserInfo] = useState({});
  const [currentPage, setCurrentPage] = useState(['main', 0,[]]); //community name, community id, searchResults
  const [postlist, setPostlist] = useState([]);
  const [topCommunity, setTopCommunity] = useState([]);
  const getTopcommunity = ()=>{
    return axios.get('/community')
    .then((res)=>{
      if (res.data.length > 0) {
        setTopCommunity(res.data);
      }
    })
    .catch((err)=>{
      console.log(err);
      alert('error fetching top communities');
    })
  }
  const getPosts = ()=>{
    let params = {community_id: currentPage[1]}
    axios.get('/posts',{params})
    .then(res=>{
      console.log(res.data);
      setPostlist(res.data);
    })
    .catch(err=>{
      console.log(err);
      alert('owo')
    })
  }
  useEffect(()=>{
    if (document.cookie.length !== 0 && Object.keys(userInfo).length === 0) {
      axios.get('/cookielogin')
      .then(res=>{
        console.log(res.data);
        setUserInfo(res.data);
      })
      .catch(err=>{
        console.log(err);
      })
      .then(()=>(getTopcommunity()))
    } else {
      getTopcommunity();
    }
  },[]);
  useEffect(getPosts, [currentPage])
  return (
    <div className="App">
      <div className="top">
        <Navbar userInfo={userInfo} setUserInfo={setUserInfo} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
      </div>

      <div className="main-page">

        <div className="left-side">
          <Profile userInfo={userInfo}/>
          <TopCommunity topCommunity={topCommunity}/>
        </div>

        <div className="right-side">
          <Main setUserInfo={setUserInfo} setCurrentPage={setCurrentPage} userInfo={userInfo} currentPage={currentPage} postlist={postlist}/>
        </div>

      </div>
    </div>
  );
}

export default App;
