module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false // Nullable according to your SQL schema
        },
        image: {
            type: DataTypes.STRING(150),
            allowNull: false
        }
    }, {
        tableName: 'category',
        timestamps: false // Assuming there are no timestamps columns
    });

    Category.associate = function (models) {
        Category.hasMany(models.Product, {
            foreignKey: 'category_id',
            as: 'productCategory'
        });
    };

    return Category ;
};