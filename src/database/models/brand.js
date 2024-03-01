module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: false // Nullable according to your SQL schema
        }
    }, {
        tableName: 'brand',
        timestamps: false // Assuming there are no timestamps columns
    });

    Brand.associate = function (models) {
        Brand.hasMany(models.Product, {
            foreignKey: 'brand_id',
            as: 'productBrand'
        });
    };

    return Brand;
};