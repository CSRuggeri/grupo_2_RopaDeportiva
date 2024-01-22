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
usersRouter.post('/login', usersController.handleLogin
  );

usersRouter.get("/dashboard", usersController.getUserProfile)

module.exports = usersRouter;