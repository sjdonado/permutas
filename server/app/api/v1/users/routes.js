const router = require('express').Router();

const messagesRouter = require('./../messages/routes');

const {
  auth,
  authFailed,
} = require('./../../../middlewares/auth');

const controller = require('./controller');

router.use(auth, controller.id);

router
  .param('id', controller.externalId);

router.route('/all')
  .get(controller.all);

router.route('/')
  .get(controller.read)
  .post(controller.create)
  .put(controller.update)
  .delete(controller.delete);

router.route('/signin')
  .post(controller.signin, authFailed);

router.route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

router
  .use('/:userId/messages', messagesRouter);

module.exports = router;
