const Category = require('./Category.js');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.send(categories);
    console.log(categories);
  } catch (error) {
    console.log(error);
    res.send(600);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.body._id, req.body);
    await category.save();
    res.sendStatus(200);
  } catch (error) {
  console.log(error);    
    res.sendStatus(500);
  }
};
