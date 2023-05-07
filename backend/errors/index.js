const IncorrectDataError = require('./incorrect-data-error');
const AuthFailedError = require('./auth-failed-error');
const ForbiddenRequestError = require('./forbidden-request-error');
const NotFoundError = require('./not-found-error');
const EmailUseError = require('./email-use-error');

module.exports = {
  IncorrectDataError,
  AuthFailedError,
  ForbiddenRequestError,
  NotFoundError,
  EmailUseError
};
