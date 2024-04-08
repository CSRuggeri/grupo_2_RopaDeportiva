const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const {uploadAvatars} = require('../Middlewares/multerMiddleware')
const {body} = require('express-validator');
const isGuest = require('../Middlewares/isGuest')
const isLoggedIn = require('../Middlewares/isLoggedIn')
const isThatUser = require('../Middlewares/isThatUser')
const {loginValidations, registerValidations} = require('../Middlewares/usersValidations')

// Ruta de registro
usersRouter.get('/register', isGuest, usersController.register);
usersRouter.post('/register', uploadAvatars.single('avatar'), registerValidations, usersController.handleRegister);

// Ruta de inicio de sesión
usersRouter.get('/login', isGuest, usersController.login);
usersRouter.post('/login', loginValidations, usersController.handleLogin);
usersRouter.post('/logout', usersController.logout);



// Ruta del dashboard
usersRouter.get('/:id/dashboard', isLoggedIn, isThatUser, usersController.getUserProfile);
usersRouter.get('/:id/edit', isLoggedIn, isThatUser, usersController.edit);
usersRouter.put('/:id', uploadAvatars.single('avatar'), registerValidations, usersController.update);


/*api*/
usersRouter.get ("/api/users/:id", usersController.userByID)
usersRouter.get("/api/users", usersController.getAllUsersAPI)
usersRouter.post("/api/users",  uploadAvatars.single('avatar'), registerValidations, usersController.registerUserAPI)
usersRouter.put("/api/users", usersController.updateUserAPi)
usersRouter.delete("/api/users", usersController.destroyUserAPI)


module.exports = usersRouter;
