const express = require("express")

const app = express()


app.use("/static", express.static(__dirname + "/src/public"))

app.get('/', (req,res)=>{
    res.sendFile(__dirname + "/src/views/home.html");
});


app.listen(3000, ()=>{
    console.log('Servidor funcionando');
});
