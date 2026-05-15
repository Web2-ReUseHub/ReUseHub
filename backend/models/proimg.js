'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ProImg extends Model {
    static associate(models) {
      // كل صورة مرتبطة بمنتج (UsedItem)
      ProImg.belongsTo(models.UsedItem, { 
        foreignKey: 'used_item_id', 
        as: 'item',
        onDelete: 'CASCADE'
      });
    }
  }

  ProImg.init(
    {
      img_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      is_main: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      used_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'ProImg',
      tableName: 'pro_img',
      timestamps: false
    }
  );

  return ProImg;
};
