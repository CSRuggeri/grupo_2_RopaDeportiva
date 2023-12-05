const express = require('express');
const router = express.Router();
const controller= require('../controllers/mainController');

router.get('/', controller.home);
router.get('/login',controller.login);
router.get('/register',controller.register);
router.get('/edit-product',controller.editProduct);
router.get('/shopping-cart',controller.shoppingCart);
router.get('/pagos',controller.pagos);
router.get('/detail',controller.detail);


module.exports= router