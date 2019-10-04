const Book = require('./Book.js');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next({ message: "That filetype isn't allowed!" }, false);
    }
  }
};

exports.upload = multer(multerOptions).single('image');

exports.resize = async (req, res, next) => {
  if (!req.file) {
    next();
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`../client/public/books/${req.body.photo}`);
  next();
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.send(books);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getBook = async (req, res) => {
  try {
    const books = await Book.findById(req.params.id);
    res.send(books);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.getBooksByCategory = async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.send(books);
  } catch (error) {
    res.send(error);
  }
};

exports.createBook = async (req, res) => {
  try {
    if (req.body.price > 0) {
      const book = new Book({ ...req.body, image: req.body.photo });
      await book.save();
      res.send(200);
    } else {
      res.send(500);
    }
  } catch (error) {
    console.log(error);
    res.send(500);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.body.id, req.body);
    await book.save();
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send(200);
  } catch (error) {
    res.send(500);
  }
};
