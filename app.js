const express = require("express")

const app = express()


app.use("/static", express.static(__dirname + "/src/public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/src/views/home.html");
});
app.get('/login', (req,res)=>{
    res.sendFile(__dirname + "/src/views/login.html");
});
app.get('/register', (req,res)=>{
    res.sendFile(__dirname + "/src/views/register.html");
});


app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});
