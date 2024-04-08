const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {uploadProduct} = require('../Middlewares/multerMiddleware');
const { body } = require('express-validator');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const isAdmin = require('../Middlewares/isAdmin')
const productValidations = require("../Middlewares/productValidations");

router.get('/', productController.index);
router.get('/create',isAdmin, productController.createProduct);
router.get('/category/:id', productController.categoryProducts);


router.post("/search", productController.search)


/*api*/
router.get("/api", productController.getAllProductsAPI)
router.post('/api',uploadProduct.single('image'), productValidations, productController.createProductAPI)  

router.post('/create', uploadProduct.single('image'), productValidations, productController.store);

router.get("/:id", productController.detail);
router.get('/:id/edit', isAdmin, productController.edit);
router.put('/:id/update',uploadProduct.single('image'),productValidations,productController.update);
router.delete('/:id/delete', isAdmin, productController.destroy);





module.exports = router