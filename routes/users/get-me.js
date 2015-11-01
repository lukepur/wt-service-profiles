var getMe = function getMe (req, res, next) {
  return res.json(req.principal);
};

module.exports = getMe
