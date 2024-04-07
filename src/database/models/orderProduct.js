module.exports = (sequelize, DataTypes) => {
    const OrderProduct = sequelize.define('OrderProduct', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        Product_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        Product_quantity:{
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        subtotal: {
            type: DataTypes.DECIMAL(11, 2).UNSIGNED,
            allowNull: true
        },
        orderId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'orderproducts',
        timestamps: true // Assuming there are no timestamps columns
    });

    OrderProduct.associate = function(models) {
        OrderProduct.belongsTo(models.Product, {
            foreignKey: 'Product_id',
            as: 'orderProducts'
        });
        OrderProduct.belongsTo(models.Order,{
            foreignKey: 'orderId',
            as: 'order'
        })
    };

    return OrderProduct;
};