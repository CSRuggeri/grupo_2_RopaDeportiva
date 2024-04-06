const productController = require("./productController");
const usersController = require("./usersController");
const localStorage = require("localStorage")
const path = require('path')
const fs = require('fs');
const {getAllProducts, findProductsByCategoryId} = require('../services/productServices')
const db = require('../database/models');

function get2RandomNumbers(min,max){
  let num1 = Math.floor(Math.random() * (max-min+1)) + min
  let num2 = Math.floor(Math.random() * (max-min+1)) + min
  while (num1 == num2) {
    num2 = Math.floor(Math.random() * (max-min+1)) + min
  }
  return {num1,num2}
}

const controller = {
  home: async(req, res) => {
    try {
      const {num1,num2} = get2RandomNumbers(1,8)
      let products = await getAllProducts()
      let prodCat1 = await findProductsByCategoryId(num1)
      let prodCat2 = await findProductsByCategoryId(num2)
      res.render("products/home", { products , prodCat1, prodCat2});
    } catch (error) {
      res.render("products/home", { products });
    }
  },

  pagos: (req, res) => {
    res.render("user/pagos.ejs");
  },

  shoppingCart: async (req, res) => {
    const cart = req.session.cart;
    const total = cart.reduce((ac,row)=>ac+Number(row.product.price*(1-(row.product.discount)/100) * row.Product_quantity),0)
    // const products = await getAllProducts() // Fetch products
    res.render('products/shopping-cart',{cart, total});
  },

  addToCart: (req, res) => {
    const product = getProductById(id); // Fetch products





    // Add the selected product to the cart
    req.session.cart.push(selectedProduct);

    res.redirect('/cart');
  },
  modifyCart: async (req,res) =>{
    if(req.body.keepSearching){
      
    }

    if (req.body.endBuy) {
      
    }
    console.log(Object.keys(req.body))

    res.redirect('/cart')


  }
};

module.exports = controller;