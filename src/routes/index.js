var express = require('express');
var router = express.Router();

const {index, distribuidores, contacto, nosotros, enviarFormulario} = require('../controllers/indexController')
/* const {validateCreate} = require('../validations/index/validateCreate') */

/* GET home page. */
router.get('/', index)
router.post('/', enviarFormulario)
router.get('/distribuidores', distribuidores)
router.get('/contacto', contacto)
router.get('/nosotros', nosotros)


module.exports = router;
