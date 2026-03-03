const fs = require('fs');
const path = require('path');

// 1) Cargar .env según entorno/ubicación
const linuxEnvPath = '/var/www/rubicat/.env';              // producción linux
const localEnvPath = path.resolve(process.cwd(), '.env');  // local (mismo nivel que package.json)

if (process.env.NODE_ENV === 'production' && fs.existsSync(linuxEnvPath)) {
  require('dotenv').config({ path: linuxEnvPath });
} else if (fs.existsSync(localEnvPath)) {
  require('dotenv').config({ path: localEnvPath });
} else {
  // si no existe ninguno, igual seguimos (pero tus keys no van a estar)
  require('dotenv').config();
}

/* if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY no definida");
} */

var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');

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
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;