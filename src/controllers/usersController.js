const bcrypt = require('bcrypt');
const db = require('../database/models');
const userService = require('../services/usersServices'); // Importa el servicio de usuarios

const usersController = {
  register: async (req, res) => {
    try {
      const { name, password, email, birthDate, address, profile } = req.body;
      const { filename } = req.file;

      const newUser = await userService.register(
        name,
        password,
        email,
        birthDate,
        address,
        profile,
        `/images/show/${filename}`
      );

      res.redirect('/login');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  handleLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const authenticatedUser = await userService.authenticate(email, password);

      if (authenticatedUser) {
        userService.saveUserSession(req, authenticatedUser);
        res.redirect('/users/dashboard');
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
