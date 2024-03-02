const db = require('../database/models');
const brand = require('../database/models/brand');

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
        const { name, description, price, discount, size, brand, category_id, gender, stock} = req.body;
        const { filename } = req.file;

        console.log(req.body)
        console.log(req.file)


        // Validate required fields
        if (!category_id) {
            throw new Error('Category ID is missing');
        }
        if (!gender) {
            throw new Error('Gender is missing');
        }

        // Find brand by ID
        const brandInstance = await db.Brand.findByPk(brand);
        if (!brandInstance) {
            throw new Error('Invalid brand');
        }

        // Find category by ID
        const categoryInstance = await db.Category.findByPk(category_id);
        if (!categoryInstance) {
            throw new Error('Invalid category');
        }

        // Create the product using Sequelize
        const newProduct = await db.Product.create({
            name,
            description,
            price,
            discount,
            stock, // Example value for stock, adjust as needed
            image: `/images/show/${filename}`,
            category_id,
            gender,
            size,
            brand_id: brandInstance.id
        }, {
            // Exclude the 'id' field from being inserted
            fields: ['name', 'description', 'price', 'discount', 'stock', 'image', 'category_id', 'gender', 'size', 'brand_id']
        });

        return { msg: `Product ${newProduct.id} created successfully`, id: newProduct.id };
    } catch (error) {
        console.error('Error creating product:', error);
        throw error;
    }
};

const editProduct = async (req) => {
    try {
        const { name, description, price, discount, size, brand, category_id, gender, stock} = req.body;
        const { filename } = req.file;

        console.log(req.body)
        console.log(req.file)


        // Validate required fields
        if (!category_id) {
            throw new Error('Category ID is missing');
        }
        if (!gender) {
            throw new Error('Gender is missing');
        }

        // Find brand by ID
        const brandInstance = await db.Brand.findByPk(brand);
        if (!brandInstance) {
            throw new Error('Invalid brand');
        }

        // Find category by ID
        const categoryInstance = await db.Category.findByPk(category_id);
        if (!categoryInstance) {
            throw new Error('Invalid category');
        }

        // Create the product using Sequelize
        const editedProduct = await db.Product.update({
            name,
            description,
            price,
            discount,
            stock, // Example value for stock, adjust as needed
            image: `/images/show/${filename}`,
            category_id,
            gender,
            size,
            brand_id: brandInstance.id
        }, {where: {id:req.params.id}});

        return { msg: `Product ${req.params.id} created successfully`};
    } catch (error) {
        console.error('Error editing product:', error);
        throw error;
    }
};

const destroyProductByPk = async (id) => {
    try {
        const deletedProduct = await db.Product.findByPk(id)
        db.Product.destroy({where:{id:id}})
        return {msg: `Producto ${id} successfully removed`, deletedProduct}
    } catch (error) {
        throw error
    }
}
    

    



module.exports = { getAllProducts, getProductById, storeProduct, editProduct, destroyProductByPk };