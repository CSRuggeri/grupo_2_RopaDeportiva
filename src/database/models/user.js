module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        rol: {
            type: DataTypes.STRING(45),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(45),
            allowNull: true // Nullable according to your SQL schema
        },
        carrito_userId: {
            type: DataTypes.INTEGER,
            allowNull: true // Nullable according to your SQL schema
        },
        carrito_Products_id: {
            type: DataTypes.INTEGER,
            allowNull: true // Nullable according to your SQL schema
        },
        carrito_Products_category_id: {
            type: DataTypes.INTEGER,
            allowNull: true // Nullable according to your SQL schema
        }
    }, {
        tableName: 'user',
        timestamps: false // Assuming there are no timestamps columns
    });

    User.associate = function(models) {
        User.belongsTo(models.Cart, {
            foreignKey: 'carrito_userId',
            as: 'cart'
        });
    };

    return User;
};