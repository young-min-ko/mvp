require('dotenv').config();
const argon2 = require('argon2')
const express = require('express');
const path = require('path');
const app = express();
const {dbSessionChecker} = require('./middleware/sessionChecker.js')
const {pool, dbfindUser} = require('../db/db.js');
const {dbLogin, dbSignup, dbSessionId} = require('../db/controllers/post.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../build")))
app.use(dbSessionChecker);


// get

// post
app.post('/signup', (req, res)=>{
  dbfindUser(req, res)
  .then((data)=>{
    if (data.rows.length !== 0) {
      res.status(401).end('username exists');
    } else {
      let saltWord = String.fromCharCode(Math.floor(Math.random()*65535), Math.floor(Math.random()*65535), Math.floor(Math.random()*65535), Math.floor(Math.random()*65535));
      return argon2.hash(req.body.password, saltWord)
      .then((password)=>{
        console.log(password);
        req.body.password = password;
        dbSignup(req, res)
      })
      .catch((err)=>{
        res.status(404).end('error sigining up');
      })
    }
  })
  .catch((err)=>{
    console.log(err);
    res.status(401).end('sign up failed')
  })
});

app.post('/login', (req, res)=>{
  dbfindUser(req, res)
  .then(data=>{
    console.log(data);
    req.body.id = data.rows[0].id
    console.log(data.rows[0].password);
    return argon2.verify(data.rows[0].password, req.body.password)
    .then((data)=>{
      console.log(data);
      if (data) {
        dbLogin(req,res)
      } else {
        res.status(404).end('wrong login info');
      }
    })
    .catch((err)=>{
      console.log(err);
      res.status(404).end('error logging in');
    })
  })
  .catch((err)=>{
    console.log(err);
    res.status(404).end('login failed');
  })
});
// put


const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening to port ${port}`)})
