'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      // علاقة مع UsedItem
      Category.hasMany(models.UsedItem, { foreignKey: 'cat_id', as: 'items' });

      // Self-Reference (تصنيف أب/ابن)
      Category.hasMany(models.Category, { foreignKey: 'parent_id', as: 'children' });
      Category.belongsTo(models.Category, { foreignKey: 'parent_id', as: 'parent' });
    }
  }

  Category.init(
    {
      name: DataTypes.STRING,
      parent_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Category',
      tableName: 'category',
      timestamps: false
    }
  );

  return Category;
};
