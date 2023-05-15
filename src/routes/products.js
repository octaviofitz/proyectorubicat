var express = require('express');
var router = express.Router();

const {classic, premium, sensitive, original} = require('../controllers/productsController');

/* GET home page. */
router.get('/classic', classic)
router.get('/premium', premium)
router.get('/sensitive', sensitive)
router.get('/original', original)

module.exports = router;