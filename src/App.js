import logo from './logo.svg';
import './style/style.css';
import Navbar from './components/navbar/Navbar.js'
import Profile from './components/profile/Profile.js'
import TopCommunity from './components/top-community/TopCommunity.js'
import Main from './components/main/Main.js'


function App() {

  return (
    <div className="App">
      <div className="top">
        <Navbar />
      </div>

      <div className="main-page">

        <div className="left-side">
          <Profile />
          <TopCommunity />
        </div>

        <div className="right-side">
          <Main />
        </div>

      </div>
    </div>
  );
}

export default App;
