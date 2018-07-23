const router = require('express').Router();

const controller = require('./controller');

const userController = require('../users/controller');

const {
  auth,
} = require('./../../../middlewares/auth');

router.use(auth, userController.id);

router
  .param('id', controller.id);

router.route('/')
  .get(controller.all)
  .post(controller.create);

router.route('/global')
  .post(controller.createGlobal);

router.route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
