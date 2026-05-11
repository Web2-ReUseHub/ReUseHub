'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      Like.belongsTo(models.UsedItem, { foreignKey: 'used_item_id', as: 'item' });
    }
  }

  Like.init({
    like_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: DataTypes.INTEGER,
    used_item_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Like',
    tableName: 'likes',
    timestamps: false
  });

  return Like;
};