const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category');
const {authentecatJwt} = require('../middleware/authentecatorJwt');


router.post('/',authentecatJwt,categoryController.create);
router.get('/',categoryController.readAll);
module.exports = router