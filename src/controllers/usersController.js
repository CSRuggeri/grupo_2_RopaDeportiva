// usersController.js
const fs = require('fs');
const path = require('path');
const localStorage = require('localStorage');
const bcrypt = require('bcrypt');
const db = require('../database/models');

const usersFilePath = path.join(__dirname, '../data/users.json');


const usersController = {
  register: async (name, password, email, birthDate, address, profile, avatar) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database using Sequelize
      const newUser = await db.User.create({
        name,
        password: hashedPassword,
        email,
        birthDate,
        address,
        profile,
        avatar,
      });

      return newUser;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw new Error('Internal Server Error');
    }
  },

  authenticate: async (email, password) => {
    try {
       
        const user = await db.User.findOne({ where: { email } });

        if (!user) {
            // User not found
            return null;
        }

       
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            
            return user;
        } else {
            
            return null;
        }
    } catch (error) {
        console.error('Error al autenticar usuario:', error);
        throw new Error('Internal Server Error');
    }
},

  handleRegistration: async (req, res) => {
    const { name, password, email, birthDate, address, profile } = req.body;
    const { filename } = req.file;
  
    const newUser = await usersController.register(
      name,
      password,
      email,
      birthDate,
      address,
      profile,
      `/images/show/${filename}`
    );
  
    res.redirect('/login');
  },

  getUserProfile: (req, res) => {
    const user = req.session.loggedUser;

    if (!user) {
      req.session.notLogged = 'No ha iniciado sesión';
      res.redirect('/login');
      return;
    }

    res.render("user/dashboard.ejs", { user });
  },

  handleLogin: async (req, res) => {
    try {
      const { email, password } = req.body;

      const authenticatedUser = await usersController.authenticate(email, password);

        if (authenticatedUser) {
            // Save user information in localStorage
            localStorage.setItem('USER_INFO', JSON.stringify(authenticatedUser));
            console.log(localStorage.getItem("USER_INFO"));
            req.session.loggedUser = authenticatedUser;
            req.session.notLogged = undefined
            if (req.body.remember!=undefined){
              res.cookie('remember',authenticatedUser.email,{maxAge: 100000})
              console.log(req.cookies.remember)
            }
            res.redirect('/users/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },

  logout: (req, res) => {
    try {
        // Clear the user session
        req.session.destroy();

        // Clear user information from localStorage
        localStorage.removeItem('USER_INFO');

        // Clear remember cookie if set
        res.clearCookie('remember');

        // Redirect the user to the login page or any other page
        res.redirect('/login');
    } catch (error) {
        console.error('Error logging out:', error);
        res.status(500).send('Internal Server Error');
    }
},
};

module.exports = usersController;
