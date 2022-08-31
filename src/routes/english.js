var express = require('express');
var router = express.Router();

const {index, formulario} = require('../controllers/englishController')
const {validateCreate} = require ('../validations/indexValidator')

/* GET home page. */
router.get('/', index)
router.post('/', validateCreate, formulario)


module.exports = router;