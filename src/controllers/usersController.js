// usersControllers.js
const fs = require('fs');
const path = require('path');
const localStorage = require('localStorage');

const usersFilePath = path.join(__dirname, '../data/users.json');

const usersController = {


  register: (username, password, email, birthDate, address, profile, avatar) => {
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
      password, 
      email,
      birthDate,
      address,
      profile,
      avatar, 
    };
  
    
    data.users.push(newUser);
  
    
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf-8');
  
    return newUser;
  },

 
  authenticate: (username, password) => {
    console.log('Attempting to authenticate:', username, password);

    const usersData = fs.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData).users;
    const user = users.find((u) => u.username === username && u.password === password);

    console.log('Found user:', user);

    return user;
},
  handleRegistration: (req, res) => {
    try {
      const { username, password, email, birthDate, address, profile } = req.body;
console.log(req.body)
     
      const { filename } = req.file;

      const newUser = usersController.register(
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
    const user = localStorage.getItem('USER_INFO');
    const userInfo = user ? JSON.parse(user) : null;

    res.render("dashboard.ejs", { user: userInfo });
},
  
handleLogin: (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Received form data:', { username, password });

        const authenticatedUser = usersController.authenticate(username, password);

        if (authenticatedUser) {
            // Save user information in localStorage
            localStorage.setItem('USER_INFO', JSON.stringify(authenticatedUser));
            console.log(localStorage.getItem("USER_INFO"));

            res.redirect('/dashboard');
        } else {
            res.status(401).send('Invalid credentials');
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
}
};

module.exports = usersController;