module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: true // Nullable according to your SQL schema
        }
    }, {
        tableName: 'brand',
        timestamps: false // Assuming there are no timestamps columns
    });

    return Brand;
};