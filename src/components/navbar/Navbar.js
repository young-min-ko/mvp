import Search from './Search.js';
import {useState} from 'react';
import axios from 'axios';

const Navbar = ({userInfo, setUserInfo}) =>{
  const [newName, setNewName] = useState('')
  // onChange
  const addSubOnChange = (e)=>{
    setNewName(e.target.value);
  }

  // onclick
  const signOutOnClick = ()=>{
    let body = userInfo;
    axios.delete('/signout', {params: body})
    .then(res=>{
      console.log(res);
      alert('signed out');
      setUserInfo({});
    })
    .catch(err=>{
      console.log(err);
      alert('error signing out')
    })

  }
  const addSubOnClick = ()=>{
    let body = {name: newName};
    axios.post('/addsubforum', body)
    .then(res=>{
      alert(res.data)
    })
    .catch(err=>{
      console.log(err.response.data);
      alert(err.response.data);
    })
  }
  return (
    <div className="navbar">
      <h1>
        hello this is navbar
        </h1>
        <Search />
        <label>
          <input placeholder="type your new forum's name" type="text" value={newName} onChange={addSubOnChange}></input>
        <button onClick={addSubOnClick}>add a subforum</button>
        </label>
        <button onClick={signOutOnClick}>sign out</button>
    </div>
  )
}

export default Navbar;