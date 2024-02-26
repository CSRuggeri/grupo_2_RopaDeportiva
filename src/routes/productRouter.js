const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {upload} = require('../Middlewares/Middlewares')

// Pass multer instance to the productController

router.get('/', productController.index);
router.get("/:id", productController.getProductById);

router.get('/create', productController.createForm);
router.post('/create', upload.single('image'), productController.store);

router.put('/:id/update', productController.update);
router.delete('/:id/delete', productController.destroy);

module.exports = router