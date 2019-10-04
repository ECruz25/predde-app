const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Categoria',
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = model('Book', bookSchema);
