const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const userService = require('../services/usersServices'); // Corregido el nombre del servicio de usuarios
const {uploadAvatars} = require('../Middlewares/Middlewares')
const {body} = require('express-validator');
const isAdmin = require('../Middlewares/GetAdmin');

const registerValidations = [
    body('name').notEmpty().withMessage('Debe ingresar su nombre'),
    body('email')
        .notEmpty().withMessage('Debe ingresar su email').bail()
        .isEmail().withMessage('Debe ingresar un formato de email válido'),
    body('password')
        .notEmpty().withMessage('Debe ingresar una contraseña').isString(),
    body('birth_date').notEmpty().withMessage('Debe ingresar su fecha de nacimiento')
]

// Ruta de registro
usersRouter.get('/register', usersController.register);
usersRouter.post('/register', uploadAvatars.single('avatar'), registerValidations, usersController.handleRegister);

// Ruta de inicio de sesión
usersRouter.get('/login', usersController.login);
usersRouter.post('/login', usersController.handleLogin);
usersRouter.post('/logout', usersController.logout);

// Ruta del dashboard
usersRouter.get('/:id/dashboard', isAdmin, usersController.getUserProfile);
usersRouter.get('/:id/edit', usersController.edit);
usersRouter.put('/:id', usersController.update);


/*api*/

usersRouter.get("/api/users", usersController.getAllUsersAPI)
usersRouter.post("/api/users",  uploadAvatars.single('avatar'), registerValidations, usersController.registerUserAPI)
usersRouter.put("/api/users", usersController.updateUserAPi)
usersRouter.delete("/api/users", usersController.destroyUserAPI)


module.exports = usersRouter;
