const express = require('express');
const router = express.Router();
const controller = require('../controllers/mainController');
const isLoggedIn = require('../Middlewares/isLoggedIn');

router.get('/', controller.home);

router.get('/cart', isLoggedIn, controller.shoppingCart)
router.post('/cart', controller.modifyCart)
router.post('/cart/:id', isLoggedIn, controller.addToCart)

router.get('/pagos', controller.pagos);

module.exports = router;