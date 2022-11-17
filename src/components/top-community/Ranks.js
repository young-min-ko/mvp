const Ranks = ({community})=>{

  return (
    <li>
      {community.name}
      <div>
      {'members: '+community.members}
      </div>
    </li>
  )
}

export default Ranks;