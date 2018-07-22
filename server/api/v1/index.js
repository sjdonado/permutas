const router = require('express').Router();

const swaps = require('./swaps/routes');
const users = require('./users/routes');

router.use('/swaps', swaps);
router.use('/users', users);

module.exports = router;
