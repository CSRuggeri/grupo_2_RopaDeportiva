const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {uploadProduct} = require('../Middlewares/multerMiddleware');
const { body } = require('express-validator');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const isAdmin = require('../Middlewares/isAdmin')

// Validaciones
const commonValidations = [
    body('name').trim().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('price').isNumeric().withMessage('El precio debe ser un número positivo'),
    body('stock').isInt({ min: 1 }).withMessage('El stock debe ser un número entero positivo'),
    body('description').trim().isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    body('category_id').isInt({ min: 1 }).withMessage('Seleccione una categoría válida'),
    body('brand').isInt({ min: 1 }).withMessage('Seleccione una marca válida')
  ];

router.get('/', productController.index);

router.get('/create',isAdmin, productController.createProduct);

/*api*/
router.get("/api", productController.getAllProductsAPI)
router.post('/api',uploadProduct.single('image'), commonValidations, productController.createProductAPI)  


router.post('/create', uploadProduct.single('image'), commonValidations, productController.store);

router.get("/:id", productController.detail);
router.get('/:id/edit', isAdmin, productController.edit)
router.put('/:id/update',uploadProduct.single('image'),commonValidations,productController.update);
router.delete('/:id/delete', isAdmin, productController.destroy);





module.exports = router