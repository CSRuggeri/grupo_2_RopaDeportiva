const express = require("express")

const app = express()


app.use("/static", express.static("./public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/views/home.html");
});
app.get('/login', (req,res)=>{
    res.sendFile(__dirname + "/views/login.html");
});
app.get('/register', (req,res)=>{
    res.sendFile(__dirname + "/views/register.html");
});
app.get('/edit-product', (req,res)=>{
    res.sendFile(__dirname + "/views/edit-product.html");
});

app.get('/shopping-cart', (req,res)=>{
    res.sendFile(__dirname + "/views/shopping-cart.html");
});

app.get('/pagos', (req,res)=>{
    res.sendFile(__dirname + "/views/pagos.html");
});

app.get('/detail', (req,res)=>{
    res.sendFile(__dirname + "/views/detail.html");
});

app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});
