const router = require('express').Router();
const bookController = require('./bookController');

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBook);
router.get('/category/:category', bookController.getBooksByCategory);
router.post(
  '/',
  bookController.upload,
  bookController.resize,
  bookController.createBook
);
router.put('/', bookController.updateBook);
router.delete('/', bookController.deleteBook);

module.exports = router;
