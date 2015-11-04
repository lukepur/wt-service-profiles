var permissions = require('../../helpers/permissions');
var User = require('../../models/user');

var getUser = function getUser (req, res, next) {
  if(!permissions.getPermitted(req.subject.sub, req.params.id)) {
    return res.status(403).json({
      message: 'Unauthorised access to this resource'
    });
  }

  if (!req.params.id) {
    return res.status(400).json({
      message: 'id required'
    });
  }

  User.findOne({_id: req.params.id, 'meta.active': true})
  .then(function (user) {
    if (!user) {
      return res.status(404).json({
        message: 'No user found for id'
      });
    }

    if (!req.query.includeMeta) {
      user.meta = undefined;
      user.__v = undefined;
    }

    return res.json(user);
  }, function (err) {
    next(err);
  });
};

module.exports = getUser
