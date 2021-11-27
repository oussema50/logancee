const express = require('express');
const router = express.Router();
const {authentecatJwt} = require('../middleware/authentecatorJwt');
const upload = require('../middleware/multer');
const productController = require('../controller/product');
router.post('/',authentecatJwt,upload.single('productImg'),productController.create)
router.get('/',productController.readAll);
router.get('/count',productController.readByCount);
router.get('/:productId',productController.read);
router.delete('/:id',authentecatJwt,productController.delete)
router.put('/:productId',authentecatJwt,upload.single('productImg'),productController.update);
module.exports = router