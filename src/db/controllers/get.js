const {pool} = require('../db.js');

const dbTopCommunity = (req, res)=> {
  let queryString = 'SELECT name, members FROM communities INNER JOIN (SELECT community_id, COUNT(community_id) as members FROM user_community GROUP BY community_id) as count ON communities.id = count.community_id ORDER BY members LIMIT 5';
  return pool.query(queryString)
  .then((data)=>{
    console.log(data.rows)
    res.send(data.rows);
  })
  .catch((err)=>{
    console.log(err);
    res.status(404).end('cannot find');
  })

}

module.exports = {
  dbTopCommunity
}