const router = require('express').Router();
const bookController = require('./bookController');
const withAuth = require('../Authentication/middleware');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.get('/category/:category', bookController.getBooksByCategory);
router.post(
  '/',
  withAuth,
  bookController.upload,
  bookController.resize,
  bookController.createBook
);
router.put('/', withAuth, bookController.updateBook);
router.put(
  '/withImage',
  withAuth,
  bookController.upload,
  bookController.resize,
  bookController.updateBookWithImage
);
router.delete('/:id', withAuth, bookController.deleteBook);

module.exports = router;
