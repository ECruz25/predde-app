const orderController = require('./orderController');
const router = require('express').Router();

router.post('/', orderController.createOrder);
