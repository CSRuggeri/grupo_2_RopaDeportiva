const { Console } = require('console');
const fs = require('fs');
const path = require('path');
const {getAllProducts,getProductById,storeProduct} = require('../services/productServices')

const productsFilePath = path.join(__dirname, '../data/product.json');

const productController = {
  // Read - Show all products
  index: (req,res) => {
    const products = getAllProducts()
    res.render('products/home', {products})
  },
  // Read - Show product details
  detail: (req,res) =>{
    const product = getProductById(req.params.id)
    const products = getAllProducts()
    const data = {
      id: req.params.id,
    };

    res.render('products/detail',{product,products, data})
  },
 
  store: (req, res) => {
    const {id, msg} = storeProduct(req)
    console.log(msg)
    res.redirect(`/products/${id}`);
  },

  // Update - Form to edit
  edit: (req, res) => {
    const { id } = req.params;
    const product = getProductById(id)
    res.render('products/edit-product', { product });
  },

  // Update - Method to update
  update: (req, res) => {
    const { id } = req.params;
    const products = getAllProducts()
    const updatedProduct = req.body;
    console.log(req.body)

    // Find the index of the product to be updated
    const index = products.findIndex((p) => p.id == id);

    // Update the product in the array
    products[index] = { id: id, ...updatedProduct };

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify({ products }, null, 2), 'utf-8');

    // Redirect to the product detail page after update
    console.log('se actualizó el producto')
    res.redirect(`/products/${id}`);
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    const { id } = req.params;
    let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

    // Filter out the product to be deleted
    products = products.filter((p) => p.id !== parseInt(id));

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify({ products }, null, 2), 'utf-8');

    // Redirect to the home page or any other page after deletion
    res.redirect('/');
  },

  createProduct: (req, res) => {
    res.render("products/edit-product.ejs");
  },
};

module.exports = productController;