const controller={
home: (req,res)=>{
    res.render("products/home.ejs");
},    
login: (req,res)=>{
    res.render("user/login.ejs");
},

register:(req,res)=>{
    res.render("user/register.ejs");
},
detail: (req,res)=>{
    const { id } = req.params;
    const data ={
        id:id,
    }

const prod1 ={
    nombre: "Campera deportiva Puma (H)",
    precio: "$6770",
    descuento: "40% off",
    image:"/images/show/camperaPumaH.jpg"
};
const prod2 ={
    nombre: "Bincha Nike",
    precio: "$1500",
    descuento: "40% off",
    image:"/images/show/binchaNike.jpg"
};
const prod3 ={
    nombre: "Campera deportiva Adiddas",
    precio: "8500",
    descuento: "40% off",
    image:"/images/show/camperaAdiddasF.jpg"
};
const prod4 ={
    nombre: "Conjunto Adiddas (hombre)",
    precio: "$22300",
    descuento: "40% off",
    image:"/images/show/conjuntoAdiddasH.jpg"
};
const prod5 ={
    nombre: "Conjunto deportivo Nike (mujer)",
    precio: "$37855",
    descuento: "40% off",
    image:"/images/show/conjuntoNikeF.jpg"
};
const prod6 ={
    nombre: "Campera deportiva Adiddas",
    precio: "$2300",
    descuento: "40% off",
    image:"/images/show/guanteNike.jpg"
}



    res.render("products/detail.ejs",  {data, prod1, prod2, prod3, prod4, prod5, prod6});
},
pagos: (req,res)=>{
    res.render("user/pagos.ejs");
},
shoppingCart: (req,res)=>{
    const { id } = req.params;
    

const products=[    
    {
        id:1,
    nombre: "Campera deportiva Puma (H)",
    precio: "$6770",
    descuento: "40% off",
    image:"/images/show/camperaPumaH.jpg"},
 { 
    id:2,
     nombre: "Bincha Nike",
    precio: "$1500",
    descuento: "40% off",
    image:"/images/show/binchaNike.jpg"},
{
    id:3,
    nombre: "Campera deportiva Adiddas",
    precio: "8500",
    descuento: "40% off",
    image:"/images/show/camperaAdiddasF.jpg"},
 {
    id:4,
    nombre: "Conjunto Adiddas (hombre)",
    precio: "$22300",
    descuento: "40% off",
    image:"/images/show/conjuntoAdiddasH.jpg"},
{
    id:5,
    nombre: "Conjunto deportivo Nike (mujer)",
    precio: "$37855",
    descuento: "40% off",
    image:"/images/show/conjuntoNikeF.jpg"},
{
    id:5,
    nombre: "Guante deportivo Nike",
    precio: "$2300",
    descuento: "40% off",
    image:"/images/show/guanteNike.jpg"},
];
   const selectedProduct = products.find(product => product.id == id);
    res.render("products/shopping-cart.ejs", {selectedProduct, products});
},
editProduct: (req,res)=>{
    res.render("products/edit-product.ejs");
},
addToCart :(req, res) => {
    const { id } = req.params;
    const selectedProduct = products.find(product => product.id == id);

    // Get the existing cart from the session or create an empty one
    req.session.cart = req.session.cart || [];

    // Add the selected product to the cart
    req.session.cart.push(selectedProduct);

    res.redirect('products/shopping-cart.ejs');
}
}
module.exports= controller
