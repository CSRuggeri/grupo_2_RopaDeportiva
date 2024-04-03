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
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true
        },
        address: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        profile: {
            type: DataTypes.STRING(45),
            allowNull: true
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true 
        },
        admin: {
            type: DataTypes.TINYINT(1),
        }
    }, {
        tableName: 'user',
        timestamps: true 
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