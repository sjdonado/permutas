const router = require('express').Router();

const messages = require('./messages/routes');
const users = require('./users/routes');

router.use('/messages', messages);
router.use('/users', users);

module.exports = router;
