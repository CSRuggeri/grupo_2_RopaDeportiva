const db = require('../database/models');
const brand = require('../database/models/brand');

const getAllProducts = async () => {
    try {
        return await db.Product.findAll({
            include: [{'association':'productCategory'}]
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

const getProductById = async (id) => {
    try {
        return await db.Product.findByPk(id);
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return []
    }
};

class Product {
    constructor(name, description, price, discount, size, brand_id, category_id, gender, stock, image,iva) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.discount = discount;
        this.size = size;
        this.brand_id = brand_id;
        this.category_id = category_id;
        this.gender = gender;
        this.stock = stock;
        this.image = image;
    }
}

const storeProduct = async (req) => {
    try {
        let { name, description, price, discount, size, brand, category_id, gender, stock } = req.body;
        let filename;
        if(req.file) {
            filename = req.file.filename;
        } else {
            filename = 'product-default.png'
        }

        console.log(req.body.price)
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

        // Create a new Product instance
        const newProduct = new Product(
            name,
            description,
            price,
            discount,
            size,
            brand,
            category_id,
            gender,
            stock,
            `/images/show/${filename}`,
        );

        const product = await db.Product.create(newProduct);

        return { msg: `Product created successfully`, id: product.id }; // Assuming newProduct has an id property
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

const findProductsByCategoryId = async (categoryId) =>{
    try {
        const category = await db.Category.findByPk(categoryId)
        const products = await db.Product.findAll({
            where:{
                category_id: categoryId
            },
            include: [{'association':'productCategory'}]
        })
        return {products,category}
    } catch (error) {
        return {products:[],category:''}
    }
}
const findProductsByBrand = async (brand) =>{

}
    

    



module.exports = { getAllProducts, getProductById, storeProduct, editProduct, destroyProductByPk, findProductsByCategoryId };