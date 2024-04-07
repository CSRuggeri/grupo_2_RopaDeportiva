module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id:{
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        total: {
            type: DataTypes.DECIMAL(11, 2).UNSIGNED,
            allowNull: true
        }
    }, {
        tableName: 'order',
        timestamps: true // Assuming there are no timestamps columns
    });

    Order.associate = function(models) {
        Order.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'userOrder'
        });
        Order.belongsToMany(models.Product, {
            through: models.OrderProduct,
            foreignKey: 'orderId',
            otherKey: 'Product_id',
            as: 'orderP'
        });
    };

    return Order;
};