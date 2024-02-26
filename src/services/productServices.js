const db = require('../database/models');

const getAllProducts = async () => {
    try {
        return await db.Product.findAll();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

const getProductById = async (id) => {
    try {
        return await db.Product.findByPk(id);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        throw error;
    }
};

const storeProduct = async (req) => {
    try {
        const { name, description, price, discount, category, size } = req.body;

        // Handle Multer file upload
        const { filename } = req.file;

        // Find the category by name
        const categoryInstance = await db.Category.findOne({ where: { name: category } });
        if (!categoryInstance) {
            throw new Error('Invalid category');
        }

        // Create the product using Sequelize
        const newProduct = await db.Product.create({
            name,
            description,
            price,
            discount,
            image: `/images/show/${filename}`,
            category_id: categoryInstance.id,
            size,
        });

        return { msg: `Product ${newProduct.id} created successfully`, id: newProduct.id };
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

module.exports = { getAllProducts, getProductById, storeProduct };