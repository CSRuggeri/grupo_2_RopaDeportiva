const express = require('express');
const router = express.Router();
const controller= require('../controllers/mainController');

router.get('/', controller.home);
router.get('/login',controller.login);
router.get('/register',controller.register);
router.get('/create',controller.editProduct);
router.get('/shopping-cart',controller.shoppingCart);
router.get('/pagos',controller.pagos);
router.get('/detail/:id',controller.detail);
router.get('/add-to-cart/:id', controller.addToCart);

module.exports= router