const jwt = require('jsonwebtoken');

const config = require('./../config');

const blacklistAuth = [{ route: '/api/v1/users', method: 'POST' }, { route: '/api/v1/users/signin', method: 'POST' }];

const auth = (req, res, next) => {
  if (blacklistAuth.some(object => object.route === req.baseUrl && object.method === req.method)) {
    next();
  } else {
    const token = req.body.token || req.query.token || req.headers.authorization;
    if (token) {
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        if (err) {
          const message = 'Unauthorized';
          res.status(401);
          res.json({
            success: false,
            message,
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      const message = 'Forbidden';
      res.status(403);
      res.json({
        success: false,
        message,
      });
    }
  }
};

const signToken = (payload, expiresIn = '12h') => jwt.sign(payload, config.jwt.secret, {
  algorithm: 'HS256',
  expiresIn,
});

const authFailed = (req, res, next) => {
  res.status(403);
  res.json({
    success: false,
    message: 'Email or password does not match',
  });
};

module.exports = {
  auth,
  authFailed,
  signToken,
};
