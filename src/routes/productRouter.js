const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Pass multer instance to the productController
module.exports = (upload) => {
  router.get('/', productController.index);
  router.get("/:id", productController.getProductById);
  router.get('/create', productController.createForm);
  router.post('/create', upload.single('image'), productController.store);
  router.put('/:id/update', productController.update);
  router.delete('/:id/delete', productController.destroy);

  return router;
};