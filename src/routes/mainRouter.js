const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
const isLoggedIn = require('../Middlewares/isLoggedIn');

router.get('/', controller.home);

router.get('/cart', isLoggedIn, controller.shoppingCart)

router.get('/pagos', controller.pagos);
router.get('/add-to-cart/:id', controller.addToCart);

module.exports = router;