const {pool} = require('../db.js');

const dbLogin = (req, res)=>{
  let queryString =``
}

const dbSignup = (req, res)=>{
  console.log(req.body);
  res.send('hello');
}

module.exports ={
  dbLogin,
  dbSignup
}