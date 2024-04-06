module.exports = (sequelize, DataTypes) => {
    const OrderP = sequelize.define('OrderP', {
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
        subtotal: {
            type: DataTypes.INTEGER.UNSIGNED,
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

    OrderP.associate = function(models) {
        OrderP.belongsTo(models.Product, {
            foreignKey: 'Product_id',
            as: 'orderProduct'
        });
        OrderP.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'userOrder'
        });
        OrderP.belongsTo(models.Order,{
            foreignKey: 'orderId',
            as: 'order'
        })
    };

    return OrderP;
};