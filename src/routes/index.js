var express = require('express');
var router = express.Router();

const {index, distribuidores, contacto, nosotros} = require('../controllers/indexController')

/* GET home page. */
router.get('/', index)
router.get('/distribuidores', distribuidores)
router.get('/contacto', contacto)
router.get('/nosotros', nosotros)


module.exports = router;
