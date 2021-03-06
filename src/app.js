const createError = require('http-errors');
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./resources/routes');
const usersRouter = require('./resources/routes/users');

const app = express();
const port = 3030

// import express from 'express';
// import handlebars from 'express-handlebars';

// view engine setup
app.engine('hbs', engine({
    extname: '.hbs'
}));
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'hbs');

app.use(morgan('combined'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
module.exports = app;
