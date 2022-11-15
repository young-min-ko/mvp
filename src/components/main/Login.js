import {useState} from 'react';
import axios from 'axios';

const Login = ({setShowMain, setUserInfo})=> {
  const [loginInfo, setLoginInfo] = useState(['','']);

  // onchange
  const onChangeLogin = (e) =>{
    let index;
    if (e.target.placeholder === 'username') {
      index = 0;
    }
    if (e.target.placeholder === 'password') {
      index = 1;
    }
    let loginInfoCopy = loginInfo.slice();
    loginInfoCopy[index] = e.target.value;
    setLoginInfo(loginInfoCopy);
  }

  // onclick
  const onClickLogin = ()=>{
    if (loginInfo[0].length < 5) {
      alert('please type a valid user name');
      return;
    }
    if (loginInfo[1].length < 8 || loginInfo[1].length > 16) {
      alert('please type a valid password');
      return;
    }
    let body = {userName: loginInfo[0], password: loginInfo[1]};

    axios.post('/login', body)
    .then((res)=>{
      console.log(res);
      setShowMain([false, false, true]);
      alert('login success!');
      return res.data;
    })
    .catch((err)=>{
      alert(err.response.data);
    })
    .then((data)=>{
      setUserInfo(data);
    })
  }

  const onClickSignup = ()=>{
    setShowMain([false, true, false]);
  }
  return (
    <div>
      <label className="username-input">username:
      <input placeholder="username" type="text" value={loginInfo[0]} onChange={onChangeLogin}></input>
      <button onClick={onClickLogin}>login</button>
      </label>
      <label className='password-input'>password:
        <input placeholder="password" type="password" onChange={onChangeLogin}></input>
        <button onClick={onClickSignup}>signup</button>
      </label>
    </div>
  )
}
export default Login;