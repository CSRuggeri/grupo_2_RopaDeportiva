const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');
const bcrypt = require('bcrypt');
const localStorage = require('localStorage'); // Añadido para utilizar localStorage

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

// Middleware para manejar la ruta de registro
const registerMiddleware = async (req, res, next) => {
  try {
    const { username, password, email, birth_date, address, profile } = req.body;
    const avatar = req.file ? `/images/show/${req.file.filename}` : '';

    // Para hashear la contraseña antes de almacenarla:
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await usersController.register(
      username,
      hashedPassword,
      email,
      birth_date,
      address,
      profile,
      avatar
    );

    // Puedes redirigir a la página de inicio de sesión o cualquier otra página después de un registro exitoso
    res.redirect('/login');
  } catch (error) {
    // Manejar errores de registro, por ejemplo, si el usuario ya existe
    console.error(error.message);
    res.status(400).send(error.message);
  }
};

// Middleware para manejar la ruta de inicio de sesión
const loginMiddleware = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Autenticar al usuario usando Bcrypt
    const authenticatedUser = await usersController.authenticate(username, password);

    if (authenticatedUser) {
      // Guardar la información del usuario en localStorage
      localStorage.setItem('USER_INFO', JSON.stringify(authenticatedUser));

      // Redirigir al dashboard después de un inicio de sesión exitoso
      res.redirect('/dashboard');
    } else {
      // Mostrar mensaje de error si las credenciales son inválidas
      res.render('user/login.ejs', {
        error: 'Credenciales inválidas. Inténtalo de nuevo.',
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error interno del servidor');
  }
};

// Ruta de registro
usersRouter.post('/register', upload.single('avatar'), registerMiddleware);

// Ruta de inicio de sesión
usersRouter.post('/login', loginMiddleware);

// Ruta del dashboard
usersRouter.get('/dashboard', usersController.getUserProfile);

module.exports = usersRouter;
