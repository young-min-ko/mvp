const {pool} = require('../db.js');

const dbLogin = (req, res)=>{
  console.log(req.body);
  let queryString = 'SELECT first_name, last_name, username, moto, signup_date FROM users WHERE username = $1';
  return pool.query(queryString, [req.body.userName])
  .then((data)=>{
    res.send(data.rows[0]);
  })
  .catch((err)=>{
    res.status(404).end(err);
  })

}

const dbSignup = (req, res)=>{
  console.log(req.body);
  let date = new Date().valueOf();
  let queryString = 'INSERT INTO users (first_name, last_name, email, username, password, moto, signup_date) VALUES ($1, $2, $3, $4, $5, $6, $7)'
  return pool.query(queryString, [req.body.firstName, req.body.lastName, req.body.email, req.body.userName, req.body.password, req.body.moto, date])
  .then((data)=>{
    console.log(data)
    delete req.body.password;
    req.body.date = date;
    res.send(req.body);
  })
  .catch((err)=>{
    console.log(err);
    res.status(404).end(err.detail)
  })
}

module.exports ={
  dbLogin,
  dbSignup
}