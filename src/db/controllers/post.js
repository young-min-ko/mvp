const {pool} = require('../db.js');
const argon2 = require('argon2');

const dbLogin = (req, res)=>{
  console.log(req.body);
  let queryString = 'SELECT first_name, last_name, username, moto, signup_date FROM users WHERE username = $1';
  return pool.query(queryString, [req.body.userName])
  .then((data)=>{
    dbSessionId(req, res)
    .then((data)=>{
      req.body.session_id = data.rows[0].session_id;
      res.send(data.rows[0])
      .catch((err)=>{
        res.status(404).end(err);
      });
    })
  })
  .catch((err)=>{
    res.status(404).end(err);
  })

}

const dbSignup = (req, res)=>{
  console.log(req.body);
  let date = new Date().valueOf();
  let queryString = 'INSERT INTO users (first_name, last_name, email, username, password, moto, signup_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id'
  return pool.query(queryString, [req.body.firstName, req.body.lastName, req.body.email, req.body.userName, req.body.password, req.body.moto, date])
  .then((data)=>{
    console.log(data)
    delete req.body.password;
    req.body.date = date;
    req.body.id = data.rows[0].id;
    dbSessionId(req, res)
    .then(data=>{
      req.body.session_id = data.rows[0].session_id;
      res.send(req.body);
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

  return argon2.hash(String.fromCharCode(Math.floor(Math.random()*65535), Math.floor(Math.random()*65535), Math.floor(Math.random()*65535), Math.floor(Math.random()*65535)))
  .then((session_id)=>{
    return pool.query(queryString, [session_id, req.body.id, time])
  })
}

module.exports ={
  dbLogin,
  dbSignup,
  dbSessionId,
}