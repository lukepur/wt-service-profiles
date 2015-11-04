var getMe = function getMe (req, res, next) {
  return res.json(req.subject);
};

module.exports = getMe
