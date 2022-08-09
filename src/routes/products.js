var express = require('express');
var router = express.Router();

const {classic, premium, sensitive} = require('../controllers/productsController')

/* GET home page. */
router.get('/classic', classic)
router.get('/premium', premium)
router.get('/sensitive', sensitive)

module.exports = router;