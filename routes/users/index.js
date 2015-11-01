var router = require('express').Router();
var auth = require('../../middleware/auth');

router.post('/', auth, require('./post-user'));
router.get('/me', auth, require('./get-me'));

module.exports = router;
