
const Profile = ({userInfo}) =>{
  const time = new Date(parseInt(userInfo.signup_date)).toDateString();
  return (
    <div className="profile">
      <p>{userInfo.first_name? userInfo.first_name+' '+userInfo.last_name: null}</p>
      <p>{userInfo.username ? '@'+userInfo.username: null}</p>
      <p>{userInfo.moto ? userInfo.moto: null}</p>
      <p>{userInfo.signup_date ? 'member since' : null}</p>
      <p>{userInfo.signup_date ? `${time}` : null}</p>
    </div>
  )
}

export default Profile;