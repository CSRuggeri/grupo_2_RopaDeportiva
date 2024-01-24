const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/main');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/userRouter');  
const multer = require('multer');
const app = express();
const session = require('express-session')
const cookieParser = require('cookie-parser');
const fs = require ('fs')

// Set up EJS view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware
app.use(session({secret:'secret (?'}));

//Cookie parser middleware
app.use(cookieParser());

//remember me middleware
app.use((req,res,next)=>{
  if (req.cookies.remember != undefined && req.session.loggedUser==undefined){
    const usersFilePath = path.join(__dirname, './data/users.json');
    const usersData =fs.readFileSync(usersFilePath, 'utf-8');
    const users = JSON.parse(usersData).users;
    const user = users.find((u) => u.username == req.cookies.remember );
    req.session.loggedUser = user
    console.log('se ha reestablecido la conexión')
  }
  next();
})

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