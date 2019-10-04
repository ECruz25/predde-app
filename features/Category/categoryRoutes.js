const router = require('express').Router();
const categoryController = require('./categoryController');
const withAuth = require('../Authentication/middleware');

router.get('/', categoryController.getCategories);
router.post('/', withAuth, categoryController.createCategory);
router.put('/', withAuth, categoryController.updateCategory);

module.exports = router;
