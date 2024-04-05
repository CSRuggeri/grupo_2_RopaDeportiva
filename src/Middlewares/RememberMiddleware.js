const db = require('../database/models');

let rememberMe = async (req, res, next) => {
    try {
      if (req.cookies.remember && !req.session.loggedUser) {
        const user = await db.User.findOne({ where: { email: req.cookies.remember } });
        if (user) {
          req.session.loggedUser = user;
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