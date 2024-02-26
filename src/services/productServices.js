const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/product.json');


const getAllProducts = ()=>{
    const productsFilePath = path.join(__dirname, '../data/product.json');
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products
    return products
}

const getProductById = (id)=>{
    const products = getAllProducts()
    return products.find((product) => product.id == id)
}

const storeProduct = (req) =>{
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

    const newProduct = {
        id,
        name,
        description,
        image: `/images/show/${filename}`, // Assuming Multer has stored the file
        link: `products/${id}`,
        price,
        discount: req.body.discount || '', // Include the discount from the form
        category,
        size: talle,
    };

    // Add the new product to the array
    data.products.push(newProduct);

    // Write the updated products array back to the file
    fs.writeFileSync(productsFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return {msg: `producto ${id} creado exitosamente`,id: id}
}

module.exports = {getAllProducts,getProductById,storeProduct}