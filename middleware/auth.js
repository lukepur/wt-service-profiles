var tokenUtils = require('wt-lib-auth-token')();

var getLoggedInUser = function getLoggedInUser (req, res, next) {
  var authHeader = req.header('Authorization');
  tokenUtils.verify(authHeader)
  .then(function (user) {
    req.principal = user;
    next();
  })
  .catch(function(err) {
    res.status(403).json({
      message: 'Invalid authorization token'
    });
  });
};

module.exports = getLoggedInUser
