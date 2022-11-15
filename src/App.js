import {useState, useEffect} from 'react';
import axios from 'axios';
import './style/style.css';
import Navbar from './components/navbar/Navbar.js';
import Profile from './components/profile/Profile.js';
import TopCommunity from './components/top-community/TopCommunity.js';
import Main from './components/main/Main.js';


function App() {
  const [userInfo, setUserInfo] = useState({});
  const [topCommunity, setTopCommunity] = useState([{name: 'wow', count: 4}, {name: 'wow2', count: 3}, {name: 'wow3', count: 2}, {name: 'wow4', count: 1}, {name: 'wow5', count: 0}]);

  const getTopcommunity = ()=>{
    axios.get('/community')
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
  useEffect(getTopcommunity,[]);
  return (
    <div className="App">
      <div className="top">
        <Navbar />
      </div>

      <div className="main-page">

        <div className="left-side">
          <Profile userInfo={userInfo}/>
          <TopCommunity topCommunity={topCommunity}/>
        </div>

        <div className="right-side">
          <Main setUserInfo={setUserInfo}/>
        </div>

      </div>
    </div>
  );
}

export default App;
