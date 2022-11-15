
const Profile = ({userInfo}) =>{

  return (
    <div className="profile">
      <h3>{userInfo.first_name? userInfo.first_name+' '+userInfo.last_name: null}</h3>
      <h3>{userInfo.username ? '@'+userInfo.username: null}</h3>
      <h3>{userInfo.moto ? userInfo.moto: null}</h3>
      <h3>{userInfo.signup_date ? `member since ${new Date(parseInt(userInfo.signup_date))}` : null}</h3>
    </div>
  )
}

export default Profile;