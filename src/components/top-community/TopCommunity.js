import Ranks from './Ranks.js'

const TopCommunity = ({topCommunity})=>{

  return (
    <div className="top-community">
      <h1 className="top-community-title">Top community ranking</h1>
      <ol>
        {topCommunity.length !== 0 ? topCommunity.map((community)=>{
          return <Ranks community={community}/>
        }): null}
      </ol>
    </div>
  )
}

export default TopCommunity;