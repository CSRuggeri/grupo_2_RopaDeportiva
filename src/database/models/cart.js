module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Products_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        Products_category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
    }, {
        tableName: 'cart',
        timestamps: false // Assuming there are no timestamps columns
    });

    Cart.associate = function(models) {
        Cart.belongsTo(models.Product, {
            foreignKey: 'Products_id',
            as: 'product'
        });
    };

    return Cart;
};