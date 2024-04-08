const productController = require("./productController");
const usersController = require("./usersController");
const localStorage = require("localStorage")
const path = require('path')
const fs = require('fs');
const {getAllProducts, findProductsByCategoryId, getProductById, getXProducts, findXProductsByCategoryId, getCategories} = require('../services/productServices')
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
      let category = await getCategories()
      let products = await getXProducts(10)
      let prodCat1 = await findXProductsByCategoryId(num1, 10)
      let prodCat2 = await findXProductsByCategoryId(num2, 10)
      res.render("products/home", { products: products.sort(() => Math.random() - 0.5) , prodCat1, prodCat2, category});
    } catch (error) {
      res.render("products/home", { products: [], category: [] });
    }
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
    const product = await getProductById(req.params.id);
    // if(req.body){
    //   const quantity = req.body.quantity
    // }
    await userService.addProductToCart(product,req, req.body.quantity)
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
    await userService.getProcessOrders(req, req.session.loggedUser)
    res.redirect(`/users/${req.session.loggedUser.id}/dashboard`)
  },
  deleteProduct: async (req,res) => {
    console.log(req.body)
    await userService.deleteFromCart(req.params.id, req)
    await userService.getCart(req)
    console.log(req.session.cart)
    res.redirect('/cart')
  },
  finishBuy: async (req,res) => {
    await userService.endOrder(req.params.id, req)
    await userService.updateTotals()
    res.redirect(`/users/${req.session.loggedUser.id}/dashboard`)
  }
};

module.exports = controller;