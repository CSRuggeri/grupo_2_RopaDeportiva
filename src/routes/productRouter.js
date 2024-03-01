const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {upload} = require('../Middlewares/Middlewares')

router.get('/', productController.index);
router.get('/create', productController.createProduct);

router.get("/:id", productController.detail);

router.post('/create', upload.single('image'), productController.store);

router.get('/:id/edit', productController.edit)
router.put('/:id/update', upload.single('image'), productController.update);
router.delete('/:id/delete', productController.destroy);

module.exports = router