'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsedItem extends Model {
    static associate(models) {
      UsedItem.belongsTo(models.Category, { foreignKey: 'cat_id', as: 'category' });
      UsedItem.hasMany(models.ProImg, { foreignKey: 'used_item_id', as: 'images' });
      UsedItem.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' });
      UsedItem.hasMany(models.Like, { foreignKey: 'used_item_id', as: 'likes' });
      UsedItem.hasMany(models.Req, { foreignKey: 'used_item_id', as: 'requests' });
    }
  }

  UsedItem.init({
    used_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: DataTypes.STRING,
    price: DataTypes.FLOAT,
    status: DataTypes.STRING,
    seller_id: DataTypes.INTEGER,
    cat_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    is_sold: {        
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'UsedItem',
    tableName: 'used_item',
    timestamps: false,
  });

  return UsedItem;
};