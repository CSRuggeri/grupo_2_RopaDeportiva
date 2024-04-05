const path = require('path');
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const cors = require('cors');
const mainRouter = require('./routes/mainRouter');
const productRouter = require('./routes/productRouter');
const usersRouter = require('./routes/userRouter');  

const {rememberMe} = require('./Middlewares/Middlewares')

// Set up EJS view engine
app.set('view engine', 'ejs');
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, '/views'));

// Add body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Session middleware
app.use(session({secret:'s8AOM0dvWl2k9pt', saveUninitialized:false,resave:false,}));

//Cookie parser middleware
app.use(cookieParser());

//Remember me middleware
app.use(rememberMe)

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));

// Method Override
app.use(methodOverride('_method'))

//cors
app.use(cors());

// Set up routes
app.use('/products', productRouter); // Pass upload to productRouter

app.use('/users', usersRouter);

app.use('/', mainRouter);

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use((req,res,next)=>{
    res.status(404).send('page not found');
    next();
})