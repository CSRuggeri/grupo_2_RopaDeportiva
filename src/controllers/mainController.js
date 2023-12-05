const controller={
home: (req,res)=>{
    res.render('home.ejs');
},    
login: (req,res)=>{
    res.render("login.ejs");
},

register:(req,res)=>{
    res.render("register.ejs");
},
detail: (req,res)=>{
    res.render("detail.ejs");
},
pagos: (req,res)=>{
    res.render("pagos.ejs");
},
shoppingCart: (req,res)=>{
    res.render("shopping-cart.ejs");
},
editProduct: (req,res)=>{
    res.render("edit-product.ejs");
},

}
module.exports= controller
