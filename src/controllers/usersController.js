const bcrypt = require('bcrypt');
const db = require('../database/models');
const userService = require('../services/usersServices'); // Importa el servicio de usuarios
const {validationResult} = require('express-validator')

const usersController = {
  login: (req, res) => {
    let userSession = req.session.loggedUser
    if(userSession){
      res.redirect(`/${userSession.id}/dashboard`)
    }
    res.render("user/login.ejs");
  },

  register: (req, res) => {
    res.render("user/register.ejs");
  },

  handleRegister: async (req, res) => {
    try {
      const errores = validationResult(req)

      if(!errores.isEmpty()) {
        console.log(errores)
        return res.render('user/register', {errores: errores.array()})
      } else{

      const { name, password, email, birth_date, address, profile } = req.body;
      const { filename } = req.file;

      const newUser = await userService.register(
        name,
        password,
        email,
        birth_date,
        address,
        profile,
        `/images/avatars/${filename}`
      );

     
      res.redirect('/users/login');
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  handleLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const authenticatedUser = await userService.authenticate(email, password);

      console.log(authenticatedUser)

      if (authenticatedUser) {
        userService.saveUserSession(req, authenticatedUser);
        res.redirect(`/users/${authenticatedUser.id}/dashboard`);
      } else {
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  logout: (req, res) => {
    try {
      userService.logout(req, res);
    } catch (error) {
      console.error('Error logging out:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  getUserProfile: (req, res) => {
    userService.getUserProfile(req, res);
  },
};

module.exports = usersController;
