
const express = require("express")
const router = require('./routes/main')

const app = express()

app.set('view engine','ejs')
app.use("/static", express.static("../public"))

app.use('/',router)

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});
