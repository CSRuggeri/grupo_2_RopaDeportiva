const fs = require('fs');
const path = require('path');

const getAllProducts = ()=>{
    const productsFilePath = path.join(__dirname, '../data/product.json');
    const productsData = fs.readFileSync(productsFilePath, 'utf-8');
    const products = JSON.parse(productsData).products
    return products
}

module.exports = {getAllProducts}