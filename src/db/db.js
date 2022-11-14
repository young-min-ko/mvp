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

module.exports = {
  pool
}