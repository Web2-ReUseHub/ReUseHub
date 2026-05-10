'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsedItem extends Model {
    static associate(models) {
      // كل عنصر له كاتيجوري
      UsedItem.belongsTo(models.Category, { 
        foreignKey: 'cat_id', 
        as: 'category' 
      });

      // كل عنصر له صور
      UsedItem.hasMany(models.ProImg, { 
        foreignKey: 'used_item_id', 
        as: 'images' 
      });

      // البائع (User)
      UsedItem.belongsTo(models.User, { 
        foreignKey: 'seller_id', 
        as: 'seller' 
      });
    }
  }

  UsedItem.init(
    {
      used_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      description: DataTypes.STRING,
      price: DataTypes.FLOAT,
      status: DataTypes.STRING,
      seller_id: DataTypes.INTEGER,
      cat_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE
    },
    {
      sequelize,
      modelName: 'UsedItem',
      tableName: 'used_item',
      timestamps: false
    }
  );

  return UsedItem;
};
