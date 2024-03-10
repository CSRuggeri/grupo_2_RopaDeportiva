const fs = require ('fs')
const db = require('../database/models');
const multer = require('multer');

const storage = (folder) => multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./public/images/${folder}`); // Set the destination folder for your images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
    },
});
  
const uploadProduct = multer({ storage: storage('show') });
const uploadAvatars = multer({ storage: storage('avatars') });

let rememberMe = async (req, res, next) => {
  try {
    if (req.cookies.remember && !req.session.loggedUser) {
      const user = await db.User.findOne({ where: { username: req.cookies.remember } });
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

module.exports = { uploadProduct, uploadAvatars, rememberMe };
