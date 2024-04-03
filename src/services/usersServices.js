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
        return console.error("Contraseña incorrecta");
      }
    } catch (error) {
      console.error('Error authenticating user:', error); // Agrega un registro de consola para capturar el error
      throw new Error('Internal Server Error');
    }
  },

  findUserByEmail: async (email) =>{
    return await db.User.findOne({ where: { email } })
  },

  saveUserSession: (req, user) => {
    localStorage.setItem('USER_INFO', JSON.stringify(user));
    req.session.loggedUser = user;

    if (req.body.remember !== undefined) {
      res.cookie('remember', user.email, { maxAge: 100000 });
    }
  },

  logout: (req, res) => {
    console.log('Función de logout ejecutándose');
    req.session.destroy();
    localStorage.removeItem('USER_INFO');
    res.clearCookie('remember');
    console.log('Redireccionando a /login');
    res.redirect('/users/login');
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
   
  editUser : async (req) => {
    try {
        const { name, password, email, birth_date, address, profile } = req.body;
        const { filename } = req.file;

        console.log(req.body);
        console.log(req.file);

        // Validate required fields
        if (!email) {
            throw new Error('Email is missing');
        }

        // Find user by email
        const userInstance = await db.User.findOne({ where: { email } });
        if (!userInstance) {
            throw new Error('User not found');
        }

        // Update the user using Sequelize
        const editedUser = await db.User.update({
            name,
            password,
            birth_date,
            address,
            profile,
            avatar: `/images/avatars/${filename}`
        }, { where: { id: userInstance.id } });

        return { msg: `User ${userInstance.id} updated successfully` };
    } catch (error) {
        console.error('Error editing user:', error);
        throw error;
    }
},
  
 getAll : async () => {
  try {
      return await db.User.findAll();
  } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
  }
},
destroyUserByPk : async (id) => {
  try {
      const deletedUser = await db.User.findByPk(id);
      await db.User.destroy({ where: { id } });
      return { msg: `User ${id} successfully removed`, deletedUser };
  } catch (error) {
      throw error;
  }
}


};

module.exports = userService;
