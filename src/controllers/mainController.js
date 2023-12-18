const productController = require("./productController");

const controller = {
    home: (req, res) => {
        const products = productController.index();
        res.render("products/home", { products });
      },

  login: (req, res) => {
    res.render("user/login.ejs");
  },

  register: (req, res) => {
    res.render("user/register.ejs");
  },

  detail: (req, res) => {
    const { id } = req.params;
    const products = productController.index();
    console.log(products);
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
    const { id } = req.params;
    const products = productController.index(); // Fetch products
    const selectedProduct = products.find((product) => product.id == id);
    res.render("products/shopping-cart.ejs", { selectedProduct, products });
  },

  editProduct: (req, res) => {
    res.render("products/edit-product.ejs");
  },

  addToCart: (req, res) => {
    const { id } = req.params;
    const products = productController.index(); // Fetch products
    const selectedProduct = products.find((product) => product.id == id);

    // Get the existing cart from the session or create an empty one
    req.session.cart = req.session.cart || [];

    // Add the selected product to the cart
    req.session.cart.push(selectedProduct);

    res.redirect('products/shopping-cart.ejs');
  },
};

module.exports = controller;