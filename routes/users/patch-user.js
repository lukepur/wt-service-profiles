var _ = require('lodash');
var User = require('../../models/user');
var permissions = require('../../helpers/permissions');

var PATCH_WHITELIST = ['/first_name', '/last_name'];

var patchUser = function patchUser (req, res, next) {
  var patches;

  if (!req.params.id) {
    return res.status(400).json({
      message: 'id is required to patch a profile'
    });
  }

  if (!permissions.patchPermitted(req.subject.sub, req.params.id)) {
    return res.status(403).json({
      message: 'Unauthorized operation'
    });
  }

  User.findOne({_id: req.params.id, 'meta.active': true})
  .then(function (user) {
    if (!user) {
      return res.status(404).json({
        message: 'No user found for id'
      });
    }

    patches = _.filter(req.body, function(prop) {
      return prop.op && PATCH_WHITELIST.indexOf(prop.path) > -1;
    });

    return user.patch(patches, function (err) {
      if (err) return next(err);
    });
  }, function (err) {
    next(err);
  })
  .then(function (user) {
    return res.json(user);
  }, function (err) {
    next(err);
  });
};

module.exports = patchUser
