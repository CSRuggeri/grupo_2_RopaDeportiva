const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');
const multer = require('multer');

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/show'); // Set the destination folder for your images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage: storage });

usersRouter.post('/register', upload.single('avatar'), (req, res) => {
    try {
      const { username, password, email, birth_date, address, profile } = req.body;
      const avatar = req.file ? `/images/show/${req.file.filename}` : '';
  
      
  
      const newUser = usersController.register(username, password, email, birth_date, address, profile, avatar);
      // You can redirect to the login page or any other page after successful registration
      res.redirect('/login');
    } catch (error) {
      // Handle registration errors, e.g., user already exists
      console.error(error.message);
      res.status(400).send(error.message);
    }
  });


// Route to handle user login
usersRouter.post('/login', (req, res) => {
    try {
      const { user, pass } = req.body; // Change to match form field names
      console.log("request", req.body);
      const authenticatedUser = usersController.authenticate(user, pass); // Change to match form field names
      if (authenticatedUser) {
        // Set user session or token (in a real-world scenario)
        // You can redirect to the user dashboard or any other page after successful login
        res.redirect('/');
      } else {
        // Handle login failure (invalid credentials)
        res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      // Handle login errors
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  });

// Add more routes as needed

module.exports = usersRouter;