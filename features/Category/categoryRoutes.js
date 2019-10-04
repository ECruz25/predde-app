const router = require('express').Router();
const categoryController = require('./categoryController');
const withAuth = require('../Authentication/middleware');

router.get('/', categoryController.getCategories);
router.put('/updateCategory', withAuth, categoryController.updateCategory);
router.put('/deleteCategory', withAuth, categoryController.deleteCategory);
router.post('/createCategory', withAuth, categoryController.createCategory);
router.put('/checkToken', withAuth, categoryController.updateCategory);

module.exports = router;
