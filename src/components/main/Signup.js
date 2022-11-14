import {useState} from 'react';

const Signup = ()=>{
  const [signupInfo, setSignupInfo] = useState(['','','','','','','']) // 0 firstName, 1 lastName, 2 email, 3 userName, 4 password, 5 pasword check, 6 moto,

  // onchange
  const onChangeSignup = (e)=>{
    let index;
    if (e.target.placeholder === 'first name') {
      index = 0;
    }
    if (e.target.placeholder === 'last name') {
      index = 1;
    }
    if (e.target.placeholder === 'email') {
      index = 2;
    }
    if (e.target.placeholder === 'user name') {
      index = 3;
    }
    if (e.target.placeholder === 'password') {
      index = 4;
    }
    if (e.target.placeholder === 'confirm password') {
      index = 5;
    }
    if (e.target.placeholder === 'moto') {
      index = 6;
    }
    let signupInfoCopy = signupInfo.slice();
    signupInfoCopy[index] = e.target.value;
    setSignupInfo(signupInfoCopy);
  }

  // onsubmit
  const onSubmitSignup = ()=>{
    if (signupInfo[0].length === 0) {
      alert('please type in your first name!');
      return;
    }
    if (signupInfo[1].length === 0) {
      alert('please type in your last name!');
      return;
    }
    if (signupInfo[2].length === 0) {
      alert('please type in your email!');
      return;
    }
    if (signupInfo[3].length < 5) {
      alert('user name should be at least 5 characters long');
      return;
    }
    if (signupInfo[4].length < 8 || signupInfo[4].length > 16) {
      alert('password should be at least 8 characters long and at most 16 charcters');
      return;
    }
    if (signupInfo[4] !== signupInfo[5]) {
      alert('your password do not match, confirm your password again!');
      return;
    }
    if (signupInfo[5].legnth === 0) {
      alert('please type in your moto!')
      return;
    }
  }

  return (
    <div>
      <form onSubmit={onSubmitSignup}>
        <label>First name:
          <input placeholder="first name" type="text" value={signupInfo[0]} onChange={onChangeSignup}></input>
        </label>
        <label>Last name:
          <input placeholder="last name" type="text" value={signupInfo[1]} onChange={onChangeSignup}></input>
        </label>
        <label>Email:
          <input placeholder="email" type="text" value={signupInfo[2]} onChange={onChangeSignup}></input>
        </label>
        <label>User name:
          <input placeholder="user name" type="text" value={signupInfo[3]} onChange={onChangeSignup}></input>
        </label>
        <label>Password:
          <input placeholder="password" type="password" value={signupInfo[4]} onChange={onChangeSignup}></input>
        </label>
        <label>Confirm password:
          <input placeholder="confirm password" type="password" value={signupInfo[5]} onChange={onChangeSignup}></input>
        </label>
        <label>Moto:
          <input placeholder="moto" type="text" value={signupInfo[6]} onChange={onChangeSignup}></input>
        </label>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default Signup;