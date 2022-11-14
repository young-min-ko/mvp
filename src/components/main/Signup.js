import {useState} from 'react';

const Signup = ()=>{
  const [signupInfo, setSignupInfo] = useState(['','','','','','','']) // 0 firstName, 1 lastName, 2 email, 3 userName, 4 password, 5 pasword check, 6 moto,
  return (
    <div>
      <form>
        <label>
          <input type="text"></input>
        </label>
      </form>
    </div>
  )
}

export default Signup;