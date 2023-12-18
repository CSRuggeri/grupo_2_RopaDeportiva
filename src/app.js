const path = require('path');
const express = require("express")
const router = require('./routes/main')
const productRouter = require('./routes/productRouter');
const app = express()
const bodyParser = require('body-parser');

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));
// Add this middleware configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static(path.join(__dirname, '../public')));
app.use('/products', productRouter);
app.use('/',router)

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});
