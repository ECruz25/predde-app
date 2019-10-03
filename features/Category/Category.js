const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = model('Category', categorySchema);