const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');


// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/show'); // Set the destination folder for your images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage: storage });



// Ruta de registro
usersRouter.post('/register', upload.single('avatar'), usersController.handleRegistration);

// Ruta de inicio de sesión
usersRouter.post('/login', usersController.handleLogin);
usersRouter.post("/logout", usersController.logout)
// Ruta del dashboard
usersRouter.get('/dashboard', usersController.getUserProfile);

module.exports = usersRouter;
