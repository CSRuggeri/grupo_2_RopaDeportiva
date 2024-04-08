const productController = require("./productController");
const usersController = require("./usersController");
const localStorage = require("localStorage")
const path = require('path')
const fs = require('fs');
const {getAllProducts, findProductsByCategoryId, getProductById, getXProducts} = require('../services/productServices')
const db = require('../database/models');
const userService = require("../services/usersServices");

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
      let products = await getXProducts(10)
      let prodCat1 = await findProductsByCategoryId(num1)
      let prodCat2 = await findProductsByCategoryId(num2)
      res.render("products/home", { products: products.sort(() => Math.random() - 0.5) , prodCat1, prodCat2});
    } catch (error) {
      res.render("products/home", { products });
    }
  },




  pagos: (req, res) => {
    res.render("user/pagos.ejs");
  },

  shoppingCart: async (req, res) => {
    if (!req.session.cart) {
      await userService.createCart(req)
    }
    const cart = req.session.cart;
    return res.render('products/shopping-cart',{cart});
  },

  addToCart: async (req, res) => {
    if(!req.session.activeOrder) {
      await userService.createCart(req)
    }
    const product = await getProductById(req.params.id); // Fetch products
    await userService.addProductToCart(product,req)
    res.redirect('/cart');
  },

  modifyCart: async (req,res) =>{
    let cantidades = []
    Object.keys(req.body).forEach(k =>{
      if(k.includes('product-quantity')){
        cantidades.push({row_productId: k[0], quantity: req.body[k] })
      }
    })
    await userService.updateCart(cantidades,req)
    if(req.body.ks){
      return res.redirect('/products')
    }
    if (req.body.eb) {
      await userService.endBuying(req)
      return res.redirect(`/users/${req.session.loggedUser.id}/dashboard`)
    }
    return res.redirect('/cart')
  },
  ordersList: async (req,res) =>{
    const allOrders = await userService.getAllOrders()
    res.render('user/ordersList',{allOrders})
  },
  deleteOrder: async (req,res) => {
    await userService.deleteOrderById(req.params.id)
    res.redirect(`/users/${req.session.loggedUser.id}/dashboard`)
  },
  deleteProduct: async (req,res) => {
    console.log(req.body)
    await userService.deleteFromCart(req.params.id, req)
    await userService.getCart(req)
    console.log(req.session.cart)
    res.redirect('/cart')
  }
};

module.exports = controller;