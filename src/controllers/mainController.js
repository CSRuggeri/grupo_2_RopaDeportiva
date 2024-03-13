const productController = require("./productController");
const usersController = require("./usersController");
const localStorage = require("localStorage")
const path = require('path')
const fs = require('fs');
const {getAllProducts} = require('../services/productServices')
const db = require('../database/models'); 

const controller = {
  home: async(req, res) => {
    const products = await getAllProducts()
      res.render("products/home", { products , user: req.session.loggedUser});
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

  addToCart: (req, res) => {
    const { id } = req.params;
    const products = getAllProducts(); // Fetch products
    const selectedProduct = products.find((product) => product.id == id);

    // Get the existing cart from the session or create an empty one
    req.session.cart = req.session.cart || [];

    // Add the selected product to the cart
    req.session.cart.push(selectedProduct);

    res.redirect('/shopping-cart');
  }
};

module.exports = controller;