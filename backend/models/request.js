'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Req extends Model {
    static associate(models) {
      // كل طلب مربوط بمستخدم
      Req.belongsTo(models.User, { foreignKey: 'user_id' });
      // وكل طلب مربوط بمنتج مستخدم
      Req.belongsTo(models.UsedItem, { foreignKey: 'used_item_id' });
    }
  }

  Req.init(
    {
      req_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      used_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      comment: {
        type: DataTypes.TEXT
      },
      rating: {
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Req',
      tableName: 'req',
      timestamps: false
    }
  );

  return Req;
};
