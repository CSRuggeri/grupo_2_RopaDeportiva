// productRouter.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.get("/:id", productController.getProductById)
router.post('/create', productController.store);
router.put('/:id/update', productController.update);
router.delete('/:id/delete', productController.destroy);

module.exports = router;