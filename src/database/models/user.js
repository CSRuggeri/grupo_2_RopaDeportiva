module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
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
            allowNull: true
        },
        avatar: {
            type: DataTypes.STRING(45),
            allowNull: true // Nullable according to your SQL schema
        }
    }, {
        tableName: 'user',
        timestamps: true // Assuming there are no timestamps columns
    });

    User.associate = function(models) {
        User.belongsToMany(models.Product, {
            through: models.Cart,
            foreignKey: 'userId',
            otherKey: 'Product_id',
            as: 'cart'
        });
    };

    return User;
};