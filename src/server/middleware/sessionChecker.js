const {pool} = require('../../db/db.js')

const dbSessionChecker = (req, res, next)=>{
  if (!req.body.session_id) {
    next();
  } else {
    let queryString = 'SELECT * FROM session WHERE session_id = $1';
    let queryString1 = 'DELETE FROM session WHERE session_id = $1';
    pool.query(queryString, [req.body.session_id])
    .then((data)=>{
      if (data.rows[0].expire_at < new Date().valueOf()) {
        pool.query(queryString1)
        .then(()=>{
          res.status(404).end('please log in again');
        })
        .catch((err)=>{
          console.log('dbSessionChecker err', err);
          res.status(404).end('error resetting session_id');
        })
      } else {
        next();
      }
    })

  }
}

module.exports = {
  dbSessionChecker,
}