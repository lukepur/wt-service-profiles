var router = require('express').Router();
var users = require('./users');
var clients = require('./clients');

router.use('/users', users);
router.use('/clients', clients);

module.exports = router;
