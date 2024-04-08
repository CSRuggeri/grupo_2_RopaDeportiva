const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
const isLoggedIn = require('../Middlewares/isLoggedIn');
const isAdmin = require('../Middlewares/isAdmin');

router.get('/', controller.home);

router.get('/cart', isLoggedIn, controller.shoppingCart)
router.post('/cart', controller.modifyCart)
router.get('/ordersList', isAdmin, controller.ordersList)
router.post('/cart/:id', isLoggedIn, controller.addToCart)
router.post('/cart/:id/delete', isLoggedIn, controller.deleteProduct)
router.post('/order/:id/delete', isLoggedIn, controller.deleteOrder)

router.get('/pagos', controller.pagos);

module.exports = router;