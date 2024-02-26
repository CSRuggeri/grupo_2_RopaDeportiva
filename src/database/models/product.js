module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        discount: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        size: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'product',
        timestamps: false 
    });

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'productCategory'
        });
    
        Product.belongsTo(models.Brand, {
            foreignKey: 'brand_id', 
            as: 'productBrand'
        });
    };

    return Product;
};