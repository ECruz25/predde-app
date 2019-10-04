const Order = require('./Order');

exports.createOrder = async (req, res) => {
  try {
    if (req.body.total > 0) {
      const order = new Order(req.body);
      await order.save();
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
