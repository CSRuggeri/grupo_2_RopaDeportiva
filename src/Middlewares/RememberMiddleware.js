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
            const cart = await db.OrderP.findAll({ where: { orderId: activeOrder.id }, include:['product'] })
            if (cart) {
              req.session.cart = cart
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