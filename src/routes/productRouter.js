const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const {uploadProduct} = require('../Middlewares/Middlewares');
const { body, validationResult } = require('express-validator');

// Validaciones
const commonValidations = [
    body('name').trim().isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),
    body('price').isNumeric().isPositive().withMessage('El precio debe ser un número positivo'),
    body('stock').isInt({ min: 1 }).withMessage('El stock debe ser un número entero positivo'),
    body('description').trim().isLength({ min: 10 }).withMessage('La descripción debe tener al menos 10 caracteres'),
    body('category_id').isInt({ min: 1 }).withMessage('Seleccione una categoría válida'),
    body('brand_id').isInt({ min: 1 }).withMessage('Seleccione una marca válida')
  ];

router.get('/', productController.index);

router.get('/create', productController.createProduct);

router.get("/:id", productController.detail);

router.post(
    '/create', 
    uploadProduct.single('image'), 
    commonValidations, 
    body('image').isMimeType('image/*').withMessage('Solo se permiten imágenes'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      } 
      
      try {
        await productController.store(req, res);
        res.status(201).json({ message: 'Producto creado correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el producto' });
      }
    }
  );


router.get('/:id/edit', productController.edit)

router.put(
    '/:id/update',
    uploadProduct.single('image'),
    commonValidations,
    body('image').optional().isMimeType('image/*').withMessage('Solo se permiten imágenes'),
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        await productController.update(req, res);
        res.status(200).json({ message: 'Producto actualizado correctamente' });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el producto' });
      }
    }
  );

router.delete('/:id/delete', productController.destroy);

module.exports = router