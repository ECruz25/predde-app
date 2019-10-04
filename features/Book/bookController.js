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
  try {
    if (!req.file) {
      next();
      return;
    }
    const extension = req.file.mimetype.split('/')[1];
    req.body.photo = `${uuid.v4()}.${extension}`;
    req.body.image = req.file.buffer;
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./client/public/books/${req.body.photo}`);
    next();
  } catch (error) {
    console.log(error);
    return;
  }
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
      console.log(req.body);
      const book = new Book({
        ...req.body,
        image: req.body.photo
      });

      await book.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.updateBook = async (req, res) => {
  try {
    console.log(req.body);
    const book = await Book.findByIdAndUpdate(req.body.id, req.body);
    await book.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.updateBookWithImage = async (req, res) => {
  try {
    console.log(req.body);
    const book = await Book.findByIdAndUpdate(req.body.id, {
      ...req.body,
      image: req.body.photo
    });
    await book.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
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
