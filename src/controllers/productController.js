const { Console } = require('console');
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/product.json');




const productController = {
  // Read - Show all products
  index: (req,res) => {
    const productsFilePath = path.join(__dirname, '../data/product.json');
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products
    res.render('products/home', {products})
  },
  getProductById: (productId) => {
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products;
    return products.find((product) => product.id == productId);
  },
  // Read - Show product details
 
  store: (req, res) => {
    // Retrieve existing products
    const jsonData = fs.readFileSync(productsFilePath, 'utf-8');
    const data = JSON.parse(jsonData);

    // Ensure products is an array
    if (!Array.isArray(data.products)) {
        console.error('Products is not an array:', data.products);
        return res.status(500).send('Internal Server Error');
    }

    // Extract product data from request body
    const { name, description, price, category, talle } = req.body;
    // Generate a unique ID for the new product
    const productsLength = data.products.length
    const id = productsLength + 1

    // Handle Multer file upload
    const { filename } = req.file;
    console.log('Archivo de imagen -->'+ req.file)
    const newProduct = {
        id,
        name,
        description,
        image: `/images/show/${filename}`, // Assuming Multer has stored the file
        link: `/detail/${id}`,
        price,
        discount: req.body.discount || '', // Include the discount from the form
        category,
        size: talle,
    };
    console.log('creado el producto')

    // Add the new product to the array
    data.products.push(newProduct);

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf-8');

    // Redirect to the product detail page for the newly created product
    res.redirect(`/detail/${id}`);
},
  // Update - Form to edit
  edit: (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const product = products.find((p) => p.id === parseInt(id));
    res.render('products/edit-product-form', { product });
  },

  // Update - Method to update
  update: (req, res) => {
    const { id } = req.params;
    const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
    const updatedProduct = req.body;

    // Find the index of the product to be updated
    const index = products.findIndex((p) => p.id === parseInt(id));

    // Update the product in the array
    products[index] = { id: parseInt(id), ...updatedProduct };

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify({ products }, null, 2), 'utf-8');

    // Redirect to the product detail page after update
    res.redirect(`/products/detail/${id}`);
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
   createForm : (req, res) => {
      res.render('products/createProductForm.ejs'); // Adjust the template name accordingly
  }
};

module.exports = productController;