const {pool} = require('../db.js');

const dbTopCommunity = (req, res)=> {
  let queryString = 'SELECT name, members FROM communities INNER JOIN (SELECT community_id, COUNT(community_id) as members FROM user_community GROUP BY community_id) as count ON communities.id = count.community_id ORDER BY members DESC LIMIT 5';
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

const dbComments = (req, res)=>{
  console.log(req.query);
  let queryString ="SELECT users.first_name, users.last_name, users.username as username, commentArr.id as comment_id, commentArr.body as body FROM users INNER JOIN (SELECT * FROM comments WHERE post_id = $1) AS commentArr ON commentArr.user_id = users.id";
  return pool.query(queryString, [req.query.post_id])
  .then(data=>{
    console.log(data.rows);
    res.send(data.rows);
  })
  .catch(err=>{
    console.log(err);
    res.status(401).send('cannot find comments');
  })
}

module.exports = {
  dbTopCommunity,
  dbComments
}