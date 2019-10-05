const router = require('express').Router();
const orderController = require('./orderController');
const emailController = require('../Email/emailController');

router.post('/', orderController.createOrder, emailController.sendEmail);
module.exports = router;
