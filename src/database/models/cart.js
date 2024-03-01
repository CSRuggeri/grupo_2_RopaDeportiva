module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        Product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        Product_quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'cart',
        timestamps: true // Assuming there are no timestamps columns
    });

    Cart.associate = function(models) {
        Cart.belongsTo(models.Product, {
            foreignKey: 'Product_id',
            as: 'product'
        });
        Cart.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        });
    };

    return Cart;
};