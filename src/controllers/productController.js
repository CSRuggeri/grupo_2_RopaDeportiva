const { Console } = require("console");
const fs = require("fs");
const path = require("path");
const {
  getAllProducts,
  getProductById,
  storeProduct,
  editProduct,
  destroyProductByPk,
  findProductsByCategoryId,
  findXProductsByCategoryId,
  getXProducts
} = require("../services/productServices");
const db = require("../database/models");
const { validationResult } = require("express-validator");

const productController = {
  index: async (req, res) => {
    try {
      const products = await getAllProducts();
      res.render("products/productsList", { products });
    } catch (error) {
      const products = [];
      res.render("products/productsList", { products });
    }
  },

  // Read - Show product details
  detail: async (req, res) => {
    const product = await getProductById(req.params.id);
    const {products} = await findXProductsByCategoryId(product.category_id,5 ,product.id);
    console.log(products)
    const data = {
      id: req.params.id,
    };
    res.render("products/detail", { product, products, data });
  },

  // Create - Form to create
  createProduct: async (req, res) => {
    const brands = await db.Brand.findAll();
    const category = await db.Category.findAll();
    res.render("products/createProductForm.ejs", {
      brands,
      category,
      user: req.session.loggedUser,
    });
  },

  // Store - Method to store
  store: async (req, res) => {
    const errores = validationResult(req);
    console.log(errores)
    if (!errores.isEmpty()) {
      const brands = await db.Brand.findAll();
      const category = await db.Category.findAll();
      return res.render("products/createProductForm.ejs", {
        errores: errores.mapped(),
        oldData: req.body,
        brands,
        category,
      });
    }

    const { id, msg } = await storeProduct(req);
    console.log(msg);
    res.redirect(`/products/${id}`);
  },

  // Update - Form to edit
  edit: async (req, res) => {
    const { id } = req.params;
    const product = await getProductById(id);
    const brands = await db.Brand.findAll();
    const category = await db.Category.findAll();
    console.log(product)

    res.render("products/edit-product", { product, brands, category });
  },

  // Update - Method to update
  update: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const { id } = req.params;
      const product = await getProductById(id);
      const brands = await db.Brand.findAll();
      const category = await db.Category.findAll();
      return res.render("products/edit-product", {
        product,
        brands,
        category,
        errors: errors.array(),
      });
    }

    try {
      const { msg } = await editProduct(req);
      console.log(msg);
      res.redirect(`/products/${req.params.id}`);
    } catch (error) {
      console.log(error);
      res.redirect(`/products/${req.params.id}/edit`);
    }
  },

  // Delete - Delete one product from DB
  destroy: async (req, res) => {
    try {
      const Product = await destroyProductByPk(req.params.id);
      console.log(Product);
      fs.unlinkSync(
        path.join(__dirname + `/../../public${Product.deletedProduct.image}`)
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.redirect(`/products/${req.params.id}`);
    }
  },
  categoryProducts: async (req,res) =>{
    const products = await findProductsByCategoryId(req.params.id)
    res.render('products/productsList', {products, categoria: true})
  },

  // API - Get all products
  getAllProductsAPI: async (req, res) => {
    try {
      const products = await getAllProducts();
      res.json(products);
    } catch (error) {
      const products = [];
      res.status(400).json(products);
    }
  },
  createProductAPI: async (req, res) => {
    try {
      const newProduct = await storeProduct(req);
      console.log(newProduct.msg);
      res.json(newProduct);
    } catch (error) {
      res.status(400).json("creation failed");
    }
  },
};

module.exports = productController;
