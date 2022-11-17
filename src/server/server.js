require('dotenv').config();
const argon2 = require('argon2')
const cookieParser = require('cookie-parser');
const express = require('express');
const path = require('path');
const app = express();
const {dbSessionChecker} = require('./middleware/sessionChecker.js')
const {pool, dbfindUser} = require('../db/db.js');
const {dbLogin, dbSignup, dbaddSub, dbaddPost, dbSearch, dbJoinSub} = require('../db/controllers/post.js');
const {dbTopCommunity} = require('../db/controllers/get.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../build")))
app.use(cookieParser());
app.use(dbSessionChecker);


// get
app.get('/community', dbTopCommunity)
app.get('/posts',(req, res)=>{
  console.log(req.query);
  let queryString = "SELECT posts.id, community_id, user_id, first_name, last_name, username, signup_date, title, body FROM posts INNER JOIN users ON users.id = posts.user_id AND posts.community_id = $1"
  if (req.query.community_id === '0') {
    queryString ="SELECT posts.id, community_id, user_id, first_name, last_name, username, signup_date, title, body FROM posts INNER JOIN users ON users.id = posts.user_id WHERE community_id != $1 LIMIT 10 ";
  }
  pool.query(queryString, [req.query.community_id])
  .then(data=>{
    console.log(data.rows);
    res.send(data.rows);
  })
  .catch(err=>{
    console.log(err);
    res.status(404).end('cannot find');
  })
})
// post
app.post('/search', dbSearch)
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

app.post('/addsubforum', dbaddSub)

app.post('/addpost', dbaddPost)

app.post('/join', dbJoinSub)
// put


const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening to port ${port}`)})
