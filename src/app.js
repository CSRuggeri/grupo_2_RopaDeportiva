const path = require('path');
const express = require("express")
const router = require('./routes/main')

const app = express()

app.set('view engine','ejs')
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/',router)

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});
