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
    console.log('Función de logout ejecutándose');
    try {
      userService.logout(req, res);
    } catch (error) {
      console.error('Error al llamar a la función de logout:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  

  getUserProfile: (req, res) => {
    userService.getUserProfile(req, res);
  },
  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id);
      res.render('users/edit', { user });
    } catch (error) {
      console.error('Error al mostrar el formulario de edición de usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email } = req.body;
      await db.User.update({ name, email }, { where: { id } });
      res.redirect('/users/dashboard');
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  
};

module.exports = usersController;
