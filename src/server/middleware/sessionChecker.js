const {pool} = require('../../db/db.js')

const dbSessionChecker = (req, res, next)=>{
  console.log('here we go', req.query)
  if (!req.body.session_id && !req.query.session_id) {
    next();
  } else {
    let queryString = 'SELECT * FROM session WHERE session_id = $1';
    let queryString1 = 'DELETE FROM session WHERE session_id = $1';
    pool.query(queryString, [req.body.session_id || req.query.session_id])
    .then((data)=>{
      console.log(req.url);
      if (data.length === 0) {
        res.status(404).end('non-existent session id')
      }
      if (data.rows[0].expire_at < new Date().valueOf() || req.url.indexOf('/signout') !== -1) {
        pool.query(queryString1, [req.body.session_id || req.query.session_id])
        .then(()=>{
          let digit = 404;
          if (req.url.indexOf('/signout') !== -1) {
            digit = 201;
          }
          res.status(digit).end('session expired');
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