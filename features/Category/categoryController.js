const Category = require('./Category.js');
const jwt = require('jsonwebtoken');

exports.createCategory = (req, res) => {
  const { name, description,image } = req.body;
  const category = new Category({ name, description,image });
  category.save(err => {
    if (err) {
      res.status(500).send('Error registering new category please try again.');
    } else {
      res.status(200).send('Adding category sucessfull');
    }
  });
};



exports.getCategories = (req, res) => {
  const categories = Category.find();
  res.send(categories);
};

