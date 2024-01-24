const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/main');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/userRouter');  
const multer = require('multer');
const app = express();

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/show'); // Set the destination folder for your images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Set a unique filename
  },
});

const upload = multer({ storage: storage });

// Set up routes
app.use('/products', productRouter(upload)); // Pass upload to productRouter

app.use('/users', usersRouter);

app.use('/', router);
// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = upload;