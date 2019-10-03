const router = require('express').Router();
const categoryController = require('./categoryController');
const withAuth = require('../Authentication/middleware');

router.get('/', categoryController.getCategories);
router.post('/', withAuth, categoryController.createCategory);
// router.post('/authenticate', userController.authenticate);
router.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

module.exports = router;
