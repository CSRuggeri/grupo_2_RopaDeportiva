const bcrypt = require('bcrypt');
const db = require('../database/models');
const userService = require('../services/usersServices'); // Importa el servicio de usuarios
const {validationResult} = require('express-validator')

const usersController = {
  login: (req, res) => {
    if(req.session.loggedUser){
      res.redirect(`/users/${req.session.loggedUser.id}/dashboard`)
    }
    res.render("user/login.ejs", {user: req.session.loggedUser});
  },

  register: (req, res) => {
    res.render("user/register.ejs", {user: req.session.loggedUser});
  },

  handleRegister: async (req, res) => {
    try {
      const errores = validationResult(req)
      let emailVerification = await userService.findUserByEmail(req.body.email)
      if(emailVerification){
        errores.errors.push({
          type:'field',
          value:`${req.body.email}`,
          msg: 'El email ingresado ya existe',
          path: 'email',
          location: 'body'
        })
      }
      console.log(req.body)
      if(!errores.isEmpty()) {
        return res.render('user/register', {errores: errores.mapped(), oldData: req.body})
      } else{

      const { name, password, email, birth_date, address, profile } = req.body;
      let filename;
      if(req.file) {
        filename = req.file.filename
      } else {
        filename = 'default-pfp.png'
      }
      
      console.log(req.file)

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
      const errores = validationResult(req)
      let emailVerification = await userService.findUserByEmail(req.body.email)
      if(!emailVerification){
        errores.errors.push({
          type:'field',
          value:`${req.body.email}`,
          msg: 'El email ingresado no existe',
          path: 'email',
          location: 'body'
        })
      }
      const { email, password } = req.body;
      const authenticatedUser = await userService.authenticate(email, password)
      if (!authenticatedUser){
        errores.errors.push({
          type:'field',
          value:`${req.body.email}`,
          msg: 'Credenciales inválidas',
          path: 'email',
          location: 'body'
        },{
          type:'field',
          value:`${req.body.password}`,
          msg: 'Credenciales inválidas',
          path: 'password',
          location: 'body'
        })
      }
      if(!errores.isEmpty()) {
        return res.render('user/login', {errores: errores.mapped(), oldData: req.body})
      } else{
      
      if (authenticatedUser) {
        userService.saveUserSession(req, authenticatedUser);
        res.redirect(`/users/${authenticatedUser.id}/dashboard`);
      } else {
        res.status(401).send('Invalid credentials');
      }
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
      res.redirect(`/users/${id}/dashboard`);
    } catch (error) {
      console.error('Error al actualizar el usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },

  /*api*/

  getAllUsersAPI: async (req, res) =>{
    try {
      const users = await userService.getAll()
      res.json(users)
    } catch (error) {
      const users = []
      res.status(400).json(users)
    }   
  },

};

module.exports = usersController;
