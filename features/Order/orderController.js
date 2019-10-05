const Order = require('./Order');

exports.createOrder = async (req, res, next) => {
  try {
    console.log('llegue a ala orden');
    console.log(req.body);
    if (req.body.total > 0) {
      const order = new Order(req.body);
      await order.save();
      next();
    } else {
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
