var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const userRouter = require('./features/User/userRoutes');

var app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/user', userRouter);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
