var User = require('../../models/user');
var permissions = require('../../helpers/permissions');

var deleteUser = function deleteUser (req, res, next) {
  User.findOne({_id: req.params.id, 'meta.active': true})
  .then(function(user) {
    if (!user) {
      return res.status(404).json({
        message: 'No user found for id'
      });
    }

    if (!permissions.deletePermitted(req.subject.sub, req.params.id)) {
      res.status(403).json({
        message: 'Operation not authorised'
      });
    }

    user.meta.active = false;
    return user.save();
  })
  .then(function (user) {
    res.status(204).send();
  })
  .catch(function (e) {
    next(e);
  });
};

module.exports = deleteUser;
