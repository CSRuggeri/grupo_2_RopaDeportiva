const bcrypt = require('bcrypt');
const db = require('../database/models');
const userService = require('../services/usersServices'); // Importa el servicio de usuarios
const {validationResult} = require('express-validator')
const path = require('path')
const fs = require('fs')

const usersController = {
  login: (req, res) => {
    res.render("user/login.ejs");
  },

  register: (req, res) => {
    res.render("user/register.ejs");
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

      if(!errores.isEmpty()) {

        if(req.file){
          fs.unlinkSync(
            path.join(__dirname + `/../../public/images/avatars/${req.file.filename}`)
          );
        }
        return res.render('user/register', {errores: errores.mapped(), oldData: req.body})

      }else{

      const { name, password, email, birth_date, address, profile } = req.body;
      let filename;
      req.file ? filename = req.file.filename : filename = 'default-pfp.png'
      
      let newUser = await userService.register(
        name,
        password,
        email,
        birth_date,
        address,
        profile,
        `/images/avatars/${filename}`
      );

      await userService.saveUserSession(req, res, newUser)
     
      res.redirect(`/users/${newUser.id}/dashboard`);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.render('error',{status:500, msg: 'Internal Server Error'});
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
        await userService.saveUserSession(req, res, authenticatedUser);
        res.redirect(`/users/${authenticatedUser.id}/dashboard`);
      } else {
        res.status(401).send('Invalid credentials');
      }
    }
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      res.render('error',{status:500, msg: 'Internal Server Error'});
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

  getUserProfile: async (req, res) => {
    
    await userService.getProcessOrders(req, req.session.loggedUser)
    const user = req.session.loggedUser;
    const Orders = req.session.processOrder
    res.render('user/dashboard.ejs', { user,Orders  });
  },

  edit: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await db.User.findByPk(id);
      console.log(user)
      res.render('user/editProfile.ejs', { user });
    } catch (error) {
      console.error('Error al mostrar el formulario de edición de usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  },
  
  update: async (req, res) => {
    try {
      const errores = validationResult(req)
      const userToEdit = await db.User.findByPk(req.params.id)

      if(!errores.isEmpty()) {

        if(req.file){
          fs.unlinkSync(
            path.join(__dirname + `/../../public/images/avatars/${req.file.filename}`)
          );
        }
        return res.render('user/editProfile', {errores: errores.mapped(), oldData: req.body, user: userToEdit})

      }else{
      console.log('Actualizando usuario')
      const editedUser = await userService.editUser(req, userToEdit);
      await userService.saveUserSession(req, res, editedUser)
      res.redirect(`/users/${editedUser.id}/dashboard`)
      }
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
  registerUserAPI: async(req, res)=>{
 
    try {
      const errores = validationResult(req)

      if(!errores.isEmpty()) {
        console.log(errores)
        return res.render('user/register', {errores: errores.array(), user: req.session.loggedUser})
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

     
      res.json(newUser);
      }
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      res.status(500).send('Internal Server Error');
    }
  
},

updateUserAPi: async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const editedUser = await userService.editUser(req); 
    res.json(editedUser); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
}
},
destroyUserAPI: async (req, res) => {
  try {
    const user = await destroyUserByPk(req.params.id);
    
    res.json({ message: `User ${user.deletedUser.id} successfully deleted`, deletedUser: user.deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
userByID: async (req, res ) => {
  try {
    const id = req.params.id
    const user = await userService.findUserById(id)
    res.status(200).json(user)
  } catch (error) {
   const user = []
    res.status(500).json(console.log(error),user)
  }
}

}

module.exports = usersController;
