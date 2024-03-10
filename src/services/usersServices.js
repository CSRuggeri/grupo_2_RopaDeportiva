const bcrypt = require('bcrypt');
const localStorage = require('localStorage');
const db = require ('../database/models')

const userService = {
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

      console.log('User registered successfully:', newUser); // Agrega un registro de consola

      return newUser;
    } catch (error) {
      console.error('Error registering user:', error); // Agrega un registro de consola para capturar el error
      throw new Error('Internal Server Error');
    }
  },

  authenticate: async (email, password) => {
    try {
      const user = await db.User.findOne({ where: { email } });

      if (!user) {
        return null;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error authenticating user:', error); // Agrega un registro de consola para capturar el error
      throw new Error('Internal Server Error');
    }
  },

  saveUserSession: (req, user) => {
    localStorage.setItem('USER_INFO', JSON.stringify(user));
    req.session.loggedUser = user;

    if (req.body.remember !== undefined) {
      res.cookie('remember', user.email, { maxAge: 100000 });
    }
  },

  logout: (req, res) => {
    req.session.destroy();
    localStorage.removeItem('USER_INFO');
    res.clearCookie('remember');
    res.redirect('/login');
  },

  getUserProfile: (req, res) => {
    const user = req.session.loggedUser;

    if (!user) {
      req.session.notLogged = 'No ha iniciado sesión';
      res.redirect('/users/login');
      return;
    }

    res.render('user/dashboard.ejs', { user });
  },
};

module.exports = userService;
