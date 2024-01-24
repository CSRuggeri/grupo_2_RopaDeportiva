// usersController.js
const fs = require('fs');
const path = require('path');
const localStorage = require('localStorage');
const bcrypt = require('bcrypt');

const usersFilePath = path.join(__dirname, '../data/users.json');

const usersController = {
  register: async (username, password, email, birthDate, address, profile, avatar) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      // Mantenemos la lógica para leer y escribir en el archivo dentro del bloque try
      const usersData = fs.readFileSync(usersFilePath, 'utf-8');
      const data = JSON.parse(usersData);

      if (!Array.isArray(data.users)) {
        console.error('Users is not an array:', data.users);
        throw new Error('Internal Server Error');
      }

      const id = data.users.length + 1;

      const newUser = {
        id,
        username,
        password: hashedPassword,
        email,
        birthDate,
        address,
        profile,
        avatar,
      };
    
      data.users.push(newUser);
    
      fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
    
      return newUser;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw new Error('Internal Server Error');
    }
  },

  authenticate: async (username, password) => {
    try {
      const usersData = fs.readFileSync(usersFilePath, 'utf-8');
      const users = JSON.parse(usersData).users;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = users.find((u) => u.username === username && u.password === hashedPassword);
      
      console.log('Found user:', user);
      
      return user;
    } catch (error) {
      console.error('Error al autenticar usuario:', error);
      throw new Error('Internal Server Error');
    }
  },

  handleRegistration: async (req, res) => {
    try {
      const { username, password, email, birthDate, address, profile } = req.body;
      const { filename } = req.file;

      const newUser = await usersController.register(
        username,
        password,
        email,
        birthDate,
        address,
        profile,
        `/images/show/${filename}`
      );

      res.redirect('/login');
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  },

  getUserProfile: (req, res) => {
    const user = req.session.loggedUser;
    const userInfo = user ? JSON.parse(user) : null;

    if (!userInfo) {
      alert("Debes iniciar sesión primero!");
      res.redirect('/login');
      return;
    }

    res.render("dashboard.ejs", { user: userInfo });
  },

  handleLogin: async (req, res) => {
    try {
      const { username, password } = req.body;

      const authenticatedUser = await usersController.authenticate(username, password);

        if (authenticatedUser) {
            // Save user information in localStorage
            localStorage.setItem('USER_INFO', JSON.stringify(authenticatedUser));
            console.log(localStorage.getItem("USER_INFO"));
            req.session.loggedUser = authenticatedUser;
            if (req.body.remember!=undefined){
              res.cookie('remember',authenticatedUser.username,{maxAge: 100000})
              console.log(req.cookies.remember)
            }
            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  },
};

module.exports = usersController;
