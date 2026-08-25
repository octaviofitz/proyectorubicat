var express = require('express');
var router = express.Router();

const {index, distribuidores, nosotros, formulario, formularioenviado, test, origen, productos} = require('../controllers/indexController')
const {validateCreate} = require ('../validations/indexValidator')

/* GET home page. */
router.get('/', index)
router.post('/', validateCreate, formulario)
router.get('/distribuidores', distribuidores)
router.get('/test', test)
router.get('/origen', origen)
router.get('/productos', productos)
router.get('/nosotros', nosotros)
router.get('/formulario-enviado', formularioenviado)
/* router.get('/riodejaneiro', riodejaneiro); */


module.exports = router;