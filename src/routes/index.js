var express = require('express');
var router = express.Router();

const {index, distribuidores, nosotros, formulario, formularioenviado, test, riodejaneiro} = require('../controllers/indexController')
const {validateCreate} = require ('../validations/indexValidator')

/* GET home page. */
router.get('/', index)
router.post('/', validateCreate, formulario)
router.get('/distribuidores', distribuidores)
router.get('/test', test)
router.get('/nosotros', nosotros)
router.get('/formulario-enviado', formularioenviado)
router.get('/riodejaneiro', riodejaneiro);


module.exports = router;