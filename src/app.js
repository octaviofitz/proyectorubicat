require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require ('compression')

/* Requiriendo Rutas */
var indexRouter = require('./routes/index');
var productsRouter = require('./routes/products');
var englishRouter = require('./routes/english');

var app = express();
app.set('trust proxy', true);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* Indicación de donde se encuentra la carpeta public */
app.use(express.static(path.join(__dirname, '..', 'public')));


app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/eng', englishRouter);


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


