var express = require('express');
var router = express.Router();

const {
  index,
  nosotros,
  formulario,
  formularioenviado,
  origen,
  productos,
  preguntasfrecuentes
} = require('../controllers/indexController');

const { validateCreate } = require('../validations/indexValidator');

/* =========================================================
   PÁGINA PRINCIPAL
   / → newindex.ejs
   ========================================================= */

router.get('/', index);


/* =========================================================
   FORMULARIO DE CONTACTO
   ========================================================= */

router.post('/', validateCreate, formulario);


/* =========================================================
   OTRAS PÁGINAS
   ========================================================= */

router.get('/origen', origen);

router.get('/productos', productos);

router.get('/preguntas-frecuentes', preguntasfrecuentes);

router.get('/nosotros', nosotros);

router.get('/formulario-enviado', formularioenviado);


/* =========================================================
   RUTAS DESACTIVADAS
   ========================================================= */

// router.get('/distribuidores', distribuidores);
// router.get('/test', test);


module.exports = router;