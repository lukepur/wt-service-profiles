var User = require('../../models/user');
var permissions = require('../../helpers/permissions');

var postUser = function postUser (req, res, next) {
  if (!req.body.id) {
    return res.status(400).json({
      message: 'id is required to create a profile'
    });
  }

  if (!permissions.createPermitted(req.subject.sub, req.body.id)) {
    return res.status(403).json({
      message: 'Unauthorized operation'
    });
  }

  User.findOne({_id: req.body.id}, function (err, user) {
    var newUser;

    if (user) {
      return res.status(409).json({
        message: 'User profile for that id already exists'
      });
    }

    newUser = new User(req.body);
    newUser._id = req.body.id;

    // Add profile metadata
    newUser.meta = {
      creator_delegate_id: req.subject.delegate
    };

    newUser.save(function (err) {
      if (err) {
        return next(err);
      }

      return res.json(newUser);
    });
  });

};

module.exports = postUser
