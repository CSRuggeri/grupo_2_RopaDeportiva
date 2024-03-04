const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const {getAllProducts,getProductById,storeProduct, editProduct, destroyProductByPk} = require('../services/productServices')
const db = require('../database/models'); 


// const productsFilePath = path.join(__dirname, '../data/product.json');

const productController = {
  // Read - Show all products
  index: async (req,res) => {
    try {
      const products = await getAllProducts()
      res.render('products/home', {products})
    } catch (error) {
      const products = []
      res.render('products/home', {products})
    }   
  },
  // Read - Show product details
  detail: async (req,res) =>{
    const product = await getProductById(req.params.id)
    const products = await getAllProducts()
    const data = {
      id: req.params.id,
    };
    console.log(product.image)
    res.render('products/detail',{product,products, data})
  },
 
  store: async (req, res) => {
    const {id, msg} = await storeProduct(req)
    console.log(msg)
    res.redirect(`/products/${id}`);
  },

  // Update - Form to edit
  edit: async (req, res) => {
    const { id } = req.params;
    const product = await getProductById(id)
    const brands = await db.Brand.findAll()
    const category = await db.Category.findAll()
    res.render('products/edit-product', { product , brands, category});
  },

  // Update - Method to update
  update: async (req, res) => {
    try {
      const {msg} = await editProduct(req)
      console.log(msg)
      res.redirect(`/products/${req.params.id}`);
    } catch (error) {
      console.log(error)
      res.redirect(`/products/${req.params.id}/edit`)
    }
  },

  // Delete - Delete one product from DB
  destroy: async (req, res) => {
    try {
      const Product = await destroyProductByPk(req.params.id)
      console.log(Product)
      fs.unlinkSync(path.join(__dirname+`/../../public${Product.deletedProduct.image}`))
      res.redirect('/');
      
    } catch (error) {
      console.log(error)
      res.redirect(`/products/${req.params.id}`)
    }
  },

  createProduct: async (req, res) => {
    const brands = await db.Brand.findAll()
    const category = await db.Category.findAll()
    res.render("products/createProductForm.ejs", {brands, category});
  },
};

module.exports = productController;