require('dotenv').config();
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DB,
  password: process.env.PASSWORD,
  port: process.env.DBPORT
})

pool.connect((err)=>{
  if (err) {
    console.log('error');
  }
  console.log(`connected to ${process.env.DB} host: ${process.env.HOST} port: ${process.env.DBPORT}`)
})

const dbfindUser = (req, res)=>{
  console.log(req.body);
  let queryString = 'SELECT username, password FROM users WHERE username = $1'
  return pool.query(queryString,[req.body.userName])
  .then((data)=>{
    console.log('searched for user');
    return data
  })
  .catch((err)=>{
    console.log('error searching user');
    return err;
  })
}

module.exports = {
  pool,
  dbfindUser,
}