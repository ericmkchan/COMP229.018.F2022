// File: app.js
// Name: Man Kit Chan
// Student ID: 301251832
// Date: 2022-10-21
// Course: COMP229-018
// Title: Assignment 2

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); // Defining routes for users login
const contactRouter = require('./routes/bizcontactlist'); // Defining routers for business contact list

const app = express();

// Setup session
app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: 'sessionSecret'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Path for bootstrap module for CSS
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

// Passport setup
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bizcontactlist', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
