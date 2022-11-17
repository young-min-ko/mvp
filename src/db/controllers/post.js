const {pool} = require('../db.js');
const argon2 = require('argon2');

const dbLogin = (req, res)=>{
  console.log(req.body);
  let queryString = 'SELECT id, first_name, last_name, username, moto, signup_date FROM users WHERE username = $1';
  return pool.query(queryString, [req.body.username])
  .then((data)=>{
    let info = data.rows[0];
    console.log(data.rows[0]);
    return dbSessionId(req, res)
    .then((data)=>{
      console.log(info);
      console.log(data.rows);
      console.log(info);
      res.cookie('session_id', data.rows[0].session_id);
      res.status(200);
      res.send(info);
    })
    .catch(err=>{
      console.log('here',err);
    })
  })
  .catch((err)=>{
    console.log('there',err);
    res.status(404).send(err);
  })

}

const dbSignup = (req, res)=>{
  console.log(req.body);
  let date = new Date().valueOf();
  let queryString = 'INSERT INTO users (first_name, last_name, email, username, password, moto, signup_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
  return pool.query(queryString, [req.body.first_name, req.body.last_name, req.body.email, req.body.username, req.body.password, req.body.moto, date])
  .then((data)=>{
    console.log(data)
    delete req.body.password;
    req.body.signup_date = date;
    req.body.id = data.rows[0].id;
    dbSessionId(req, res)
    .then(data=>{
      console.log(data);
      req.body.session_id = data.rows[0].session_id;
      res.cookie('session_id', data.rows[0].session_id).send(req.body);
    })
    .catch((err)=>{
      console.log(err);
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(404).end(err.detail)
  })
}

const dbSessionId = (req, res) => {
  let time = new Date().valueOf() + 5 *1000 *60;
  let queryString = 'INSERT INTO session (session_id, user_id, expire_at) VALUES ( $1, $2, $3 ) RETURNING session_id'
  let queryString1 = 'DELETE FROM session WHERE user_id = (SELECT id FROM users WHERE username = $1)';
  return pool.query(queryString1, [req.body.username])
  .then(()=>{
    return argon2.hash(String.fromCharCode(Math.floor(Math.random()*65535), Math.floor(Math.random()*65535), Math.floor(Math.random()*65535), Math.floor(Math.random()*65535)))
    .then((session_id)=>{
      return pool.query(queryString, [session_id, req.body.id, time])
    })
    .catch((err)=>{
      console.log(err);
    })
  })
}

const dbaddSub = (req, res)=>{
  console.log(req.body);
  let queryString = 'INSERT INTO communities (name) VALUES ($1)';
  return pool.query(queryString, [req.body.name])
  .then(()=>{
    res.status(201).end('new community formed');
  })
  .catch((err)=>{
    res.status(404).end('try other names for your community');
  })
}

const dbaddPost = (req, res)=>{
  console.log(req.body);
  let queryString = "INSERT INTO posts (user_id, community_id, title, body) VALUES ($1, $2, $3, $4)"
  return pool.query(queryString, [req.body.id, req.body.community_id, req.body.title, req.body.body])
  .then(data=>{
    res.send('post complete');
  })
  .catch(err=>{
    console.log(err);
    res.status(404).send('posting failed');
  })
}

const dbSearch = (req, res)=>{
  console.log(req.body);
  let queryString = "SELECT * FROM communities WHERE name::text LIKE $1";
  pool.query(queryString,["%"+req.body.search+"%"])
  .then(data=>{
    console.log(data);
    res.send(data.rows);
  })
  .catch(err=>{
    console.log(err);
    res.status(404).end('err searching')
  })
}

const dbJoinSub = (req, res)=>{
  console.log(req.body);
  let queryString = 'SELECT id FROM user_community WHERE user_id = $1 AND community_id = $2';
  let queryString1 = 'INSERT INTO user_community (user_id, community_id) VALUES ($1, $2)';
  return pool.query(queryString,[req.body.user_id, req.body.community_id])
  .then(data=>{
    if (data.rows.length === 0) {
      pool.query(queryString1,[req.body.user_id, req.body.community_id])
      .then(data=>{
        console.log('joined sub forum');
        res.status(201).send('joined sub forum');
      })
      .catch(err=>{
        console.log(err);
        res.status(404).send('could not join sub forum');
      })
    } else {
      console.log('existing id pairs')
      res.status(401).send('you already joined')
    }
  })
}

module.exports ={
  dbLogin,
  dbSignup,
  dbSessionId,
  dbaddSub,
  dbaddPost,
  dbSearch,
  dbJoinSub
}