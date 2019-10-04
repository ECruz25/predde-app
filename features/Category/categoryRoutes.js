const router = require('express').Router();
const categoryController = require('./categoryController');
const withAuth = require('../Authentication/middleware');

router.get('/', categoryController.getCategories);
router.post('/createCategory', withAuth, categoryController.createCategory);
router.put('/checkToken', withAuth, categoryController.updateCategory);

module.exports = router;
