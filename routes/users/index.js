var router = require('express').Router();
var auth = require('../../middleware/auth');

router.post('/', auth, require('./post-user'));
router.get('/:id', auth, require('./get-user'));
router.post('/:id', auth, require('./patch-user'));
router.delete('/:id', auth, require('./delete-user'));
router.get('/me', auth, require('./get-me'));

module.exports = router;
