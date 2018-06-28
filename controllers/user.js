const db = require('./db_helper');
const md5 = require('md5');
exports.showSignin = (req, res) => {
  res.render('signin.html');
};
exports.handleSignin = (req, res) => {
  db.query(
    'select * from `user` where `email`=?',
    req.body.email,
    (err, results) => {
      if (err) {
        return res.json({
          code: 401,
          msg: '邮箱地址不存在'
        });
      }
      const password = md5(req.body.password);
      if (password !== results[0].password) {
        return res.json({
          code: 402,
          msg: '密码错误'
        });
      }
      res.json({
        code: 200,
        msg: '登录成功'
      })
    }
  )
};
exports.showSignup = (req, res) => {
  res.render('signup.html');
};
exports.handleSignup = (req, res) => {
  db.query(
    'select * from `users` where `email`=?',
    req.body.email,
    (err, results) => {
      if (err) {
        return res.send('服务器内部错误');
      }
      console.log(results);
      if (results.length > 0) {
        res.render('signup.html', {
          msg: '邮箱已存在'
        });
        return;
      }
      db.query(
        'select * from `users` where `nickname`=?',
        req.body.nickname,
        (err, results) => {
          if (err) {
            return res.send('服务器内部错误');
          }
          if (results.length > 0) {
            res.render('signup.html', {
              msg: '昵称已存在'
            });
            return;
          }
          req.body.createdAt = new Date();
          req.body.password = md5(req.body.password);
          db.query(
            'inser into `users` set ?',
            req.body,
            (err, results) => {
              if (err) {
                console.log(err);
                return res.send('服务器内部错误');
              }
              if (results.affectedRows === 1) {
                res.redirect('/signin');
              } else {
                res.render('signup.html', {
                  msg: '注册失败'
                });
              }
            }
          )
        }
      );
    }
  )
};
exports.handleSignout = (req, res) => {
  res.send('handleSignout');
}