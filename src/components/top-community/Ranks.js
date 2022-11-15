const Ranks = ({community})=>{

  return (
    <li>{community.name+'  members: '+community.count}</li>
  )
}

export default Ranks;