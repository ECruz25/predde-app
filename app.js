var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const userRouter = require('./features/User/userRoutes');
const categoryRoutes = require('./features/Category/categoryRoutes');
const bookRoutes = require('./features/Book/bookRoutes');
const orderRoutes = require('./features/Order/orderRoutes');

var app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/user', userRouter);
app.use('/api/category', categoryRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/order', orderRoutes);

module.exports = app;
