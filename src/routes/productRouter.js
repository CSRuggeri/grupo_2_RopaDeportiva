const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {uploadProduct} = require('../Middlewares/multerMiddleware');
const { body } = require('express-validator');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const isAdmin = require('../Middlewares/isAdmin')

// Validaciones para la creación del producto

  const productValidations = [
    body('name')
      .notEmpty().withMessage('El nombre del producto es obligatorio')
      .isLength({ max: 45 }).withMessage('El nombre del producto no puede superar los 45 caracteres'),
    body('price')
      .notEmpty().withMessage('El precio del producto es obligatorio')
      .isInt({ min: 0 }).withMessage('El precio del producto debe ser un número entero mayor o igual a 0'),
    body('stock')
      .notEmpty().withMessage('El stock del producto es obligatorio')
      .isInt({ min: 1 }).withMessage('El stock del producto debe ser un número entero mayor o igual a 1'),
    body('description')
      .notEmpty().withMessage('La descripción del producto es obligatoria')
      .isLength({ max: 150 }).withMessage('La descripción del producto no puede superar los 150 caracteres'),
    body('gender')
      .notEmpty().withMessage('El género del producto es obligatorio')
      .isLength({ max: 45 }).withMessage('El género del producto no puede superar los 45 caracteres'),
    body('image')
      .notEmpty().withMessage('La imagen del producto es obligatoria')
      .isLength({ max: 150 }).withMessage('La URL de la imagen no puede superar los 150 caracteres'),
    body('discount')
      .optional()
      .isLength({ max: 45 }).withMessage('El descuento no puede superar los 45 caracteres'),
    body('size')
      .notEmpty().withMessage('La talla del producto es obligatoria')
      .isLength({ max: 45 }).withMessage('La talla del producto no puede superar los 45 caracteres'),
    //body('category_id')
    // .isInt({ min: 1 }).withMessage('La categoría del producto debe ser un número entero mayor a 0')
    //body('brand_id')
    // .isInt({ min: 1 }).withMessage('La marca del producto debe ser un número entero mayor a 0'),
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