const { body } = require('express-validator');

// Validaciones para la creación del producto

const productValidations = [
    body('name')
      .notEmpty().withMessage('El nombre del producto es obligatorio').bail()
      .isLength({ max: 45 }).withMessage('El nombre del producto no puede superar los 45 caracteres'),
    body('price')
      .notEmpty().withMessage('El precio del producto es obligatorio').bail()
      .isInt({ min: 0 }).withMessage('El precio del producto debe ser un número entero mayor o igual a 0'),
    body('description')
      .notEmpty().withMessage('La descripción del producto es obligatoria').bail()
      .isLength({ max: 150 }).withMessage('La descripción del producto no puede superar los 150 caracteres'),
    body('gender')
      .notEmpty().withMessage('El género del producto es obligatorio'),
    body('image')
      .notEmpty().withMessage('La imagen del producto es obligatoria').bail()
      .isLength({ max: 150 }).withMessage('La URL de la imagen no puede superar los 150 caracteres'),
    body('size')
      .notEmpty().withMessage('La talla del producto es obligatoria'),
    body('category_id')
      .notEmpty().withMessage('Debes asignarle una categoria a tu producto'),
    body('brand_id')
      .notEmpty().withMessage('Debes asignarle una marca a tu producto'),
  ];

  module.export = productValidations