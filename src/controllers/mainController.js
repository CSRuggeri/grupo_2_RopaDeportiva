const productController = require("./productController");
const usersController = require("./usersController");
const localStorage = require("localStorage")
const path = require('path')
const fs = require('fs');
const {getAllProducts} = require('../services/productServices')

const controller = {
    home: (req, res) => {
      const productsFilePath = path.join(__dirname, '../data/product.json');
      const productsData = fs.readFileSync(productsFilePath, 'utf-8');
      const products = JSON.parse(productsData).products;
        res.render("products/home", { products: products });
      },

  login: (req, res) => {
    const mensajeError = req.session.notLogged
    res.render("user/login.ejs", {mensajeError});
  },

  register: (req, res) => {
    res.render("user/register.ejs");
  },

  detail: (req, res) => {
    const { id } = req.params;
    const products = getAllProducts()
    
    const data = {
      id: id,
    };

    const product = products.find((prod) => prod.id == id);

    res.render("products/detail.ejs", { data, product, products });
  },

  pagos: (req, res) => {
    res.render("user/pagos.ejs");
  },

  shoppingCart: (req, res) => {
    const { id } = req.session.cart;
    const products = getAllProducts() // Fetch products
    const selectedProduct = products.find((product) => product.id == id);
    res.render("products/shopping-cart.ejs", { selectedProduct, products });
  },

  editProduct: (req, res) => {
    res.render("products/edit-product.ejs");
  },

  addToCart: (req, res) => {
    const { id } = req.params;
    const products = getAllProducts(); // Fetch products
    const selectedProduct = products.find((product) => product.id == id);

    // Get the existing cart from the session or create an empty one
    req.session.cart = req.session.cart || [];

    // Add the selected product to the cart
    req.session.cart.push(selectedProduct);

    res.redirect('/shopping-cart');
  },

  getUserProfile: (req, res) => {
    const user = localStorage.getItem('USER_INFO');
    const userInfo = user ? JSON.parse(user) : null;

    res.render("user/dashboard.ejs", { user: userInfo });
},
};

module.exports = controller;