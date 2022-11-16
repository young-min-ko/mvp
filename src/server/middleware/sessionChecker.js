const {pool} = require('../../db/db.js')

const dbSessionChecker = (req, res, next)=>{
  console.log('here we go', req.url)
  if (!req.cookies.session_id) {
    next();
    return;
  }
  let queryString = 'SELECT * FROM session WHERE session_id = $1';
  let queryString1 = 'DELETE FROM session WHERE session_id = $1';
  let queryString2 = 'SELECT id, first_name, last_name, username, moto, signup_date FROM users WHERE id = (SELECT user_id FROM session WHERE session_id = $1)'
  pool.query(queryString,[req.cookies.session_id])
  .then(data=>{
    if (data.rows.length === 0) {
      next();
      return;
    }
    if (parseInt(data.rows[0].expire_at) < new Date().valueOf() || req.url.indexOf('signout') !== -1) {
      pool.query(queryString1,[req.cookies.session_id])
      .then(data=>{
        if (req.url.indexOf('signout') !== -1) {
          return res.clearCookie('session_id').status(201).end('signed out');
        } else {
          return res.clearCookie('session_id').status(404).end('session expired please login again');
        }
      })
      .catch(err=>{
        res.status(404).end('session reset failed')
      })
    } else {
      console.log(req.url === '/cookielogin');
      if (req.url === '/cookielogin') {
        console.log('hi');
        pool.query(queryString2,[req.cookies.session_id])
        .then(data=>{
          console.log('right here', data.rows);
          res.status(200).send(data.rows[0]);
        })
        .catch(err=>{
          console.log(err);
          res.clearCookie('session_id').status(404).end('invalid cookie');
        })
      } else {
        next();
      }
    }
  })



  // if (!req.cookies.session_id) {
  //   next();
  // } else {
  //   let queryString = 'SELECT * FROM session WHERE session_id = $1';
  //   let queryString1 = 'DELETE FROM session WHERE session_id = $1';
  //   pool.query(queryString, [req.cookies.session_id])
  //   .then((data)=>{
  //     console.log(req.url);
  //     console.log(data.rows.length);
  //     if (data.rows.length === 0) {
  //       res.status(404).end('non-existent session id')
  //       return;
  //     }
  //     if (parseInt(data.rows[0].expire_at)< new Date().valueOf() || req.url.indexOf('/signout') !== -1) {
  //       pool.query(queryString1, [req.cookies.session_id])
  //       .then(()=>{
  //         let digit = 404;
  //         if (req.url.indexOf('/signout') !== -1) {
  //           digit = 201;
  //         }
  //         res.status(digit).end('session expired');
  //       })
  //       .catch((err)=>{
  //         console.log('dbSessionChecker err', err);
  //         res.status(404).end('error resetting session_id');
  //       })
  //     } else {
  //       next();
  //     }
  //   })
  // }
}

module.exports = {
  dbSessionChecker,
}