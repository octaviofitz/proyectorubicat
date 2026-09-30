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
/* var productsRouter = require('./routes/products'); */
/* var englishRouter = require('./routes/english');
 */
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

// Redirigir www.rubicat.com.ar → rubicat.com.ar
app.use((req, res, next) => {
  if (req.hostname.startsWith('www.')) {
    return res.redirect(301, `https://${req.hostname.slice(4)}${req.originalUrl}`);
  }
  next();
});


/* Indicación de donde se encuentra la carpeta public */
app.use(express.static(path.join(__dirname, '..', 'public')));



// Productos que ahora están en /productos → redirigir
const productosVigentes = ['sensitive', 'classic', 'detox', 'premium'];

// Productos discontinuados → 410
const productosDiscontinuados = [];

app.get('/productos/:producto', (req, res, next) => {
  const p = req.params.producto.toLowerCase();

  if (productosVigentes.includes(p)) {
    return res.redirect(301, '/productos');
  }
  if (productosDiscontinuados.includes(p)) {
    return res.status(410).render('error', { message: 'Producto discontinuado', error: {} });
  }
  next();
});

app.use('/', indexRouter);

app.use('/eng', (req, res) => res.redirect(301, '/'));

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