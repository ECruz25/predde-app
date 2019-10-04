const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const orderSchema = new Schema({
  phoneNumber: {
    required: true,
    type: String,
    max: 8
  },
  email: {
    required: true,
    type: String
  },
  agreed: {
    required: true,
    type: Boolean
  },
  books: {
    type: [Schema.ObjectId],
    ref: 'Book'
  },
  bookAmount: {
    type: [Number]
  },
  total: {
    type: Number
  }
});

module.exports = model('Order', orderSchema);
