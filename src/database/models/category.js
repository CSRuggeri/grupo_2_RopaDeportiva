module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(45),
            allowNull: true // Nullable according to your SQL schema
        }
    }, {
        tableName: 'category',
        timestamps: false // Assuming there are no timestamps columns
    });

    return Category;
};