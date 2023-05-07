const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');
const { AuthFailedError } = require('../errors');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthFailedError('Необходима авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new AuthFailedError('Необходима авторизация.'));
  }

  req.user = payload;

  return next();
};
