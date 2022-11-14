require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const {pool} = require('../db/db.js');
const {dbLogin, dbSignup} = require('../db/controllers/post.js');

app.use(express.json());
app.use(express.static(path.join(__dirname, "../../build")))

const salt = process.env.SALT.split(',');

// get

// post
app.post('/signup', dbSignup);
// put


const port = process.env.PORT;

app.listen(port, ()=>{console.log(`listening to port ${port}`)})
