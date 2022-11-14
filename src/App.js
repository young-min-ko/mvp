import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar.js'
import Profile from './components/profile/Profile.js'
import TopCommunity from './components/top-community/TopCommunity.js'
import Main from './components/main/Main.js'


function App() {

  return (
    <div className="App">
      <Navbar />
      <Profile />
      <TopCommunity />
      <Main />
    </div>
  );
}

export default App;
