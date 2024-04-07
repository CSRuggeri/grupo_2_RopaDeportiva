const { Op } = require('sequelize');
const db = require('../database/models');

let rememberMe = async (req, res, next) => {
    try {
      if (req.cookies.remember && !req.session.loggedUser) {
        const user = await db.User.findOne({ where: { email: req.cookies.remember } });
        const activeOrder = await db.Order.findOne({ where: {user_id: user.id, status:{[Op.like]: '%Comprando%'}}})
        if (user) {
          req.session.loggedUser = user;
          if (activeOrder) {
            req.session.activeOrder = activeOrder
            const cart = await db.OrderProduct.findAll({ where: { orderId: activeOrder.id }, include:['orderProducts'] })
            if (cart) {
              req.session.cart = cart
            } else {
              req.session.cart = []
            }
          }
          console.log('Se ha restablecido la conexión');
        }
      }
      next();
    } catch (error) {
      console.error('Error al recuperar usuario:', error);
      next(error); // Pasar el error al siguiente middleware o controlador de errores
    }
  };

  module.exports = rememberMe