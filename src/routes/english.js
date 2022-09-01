var express = require('express');
var router = express.Router();

const {indexEng, formularioEng, FormularioEnviadoEng} = require('../controllers/englishController')
const {validateCreate} = require ('../validations/indexValidator')

/* GET home page. */
router.get('/', indexEng);
router.post('/', validateCreate, formularioEng);
router.get('/formulario-enviado', FormularioEnviadoEng);

module.exports = router;