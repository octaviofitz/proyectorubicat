var express = require('express');
var router = express.Router();

const {index, distribuidores, contacto, nosotros, formulario} = require('../controllers/indexController')
const {validateCreate} = require ('../validations/indexValidator')

/* GET home page. */
router.get('/', index)
router.post('/', validateCreate, formulario)
router.get('/distribuidores', distribuidores)
router.get('/contacto', contacto)
router.get('/nosotros', nosotros)


module.exports = router;
