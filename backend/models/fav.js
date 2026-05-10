'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Fav extends Model {
    static associate(models) {
      Fav.belongsTo(models.User, { foreignKey: 'user_id' });
      Fav.belongsTo(models.UsedItem, { foreignKey: 'used_item_id' });
    }
  }

  Fav.init(
    {
      user_id: DataTypes.INTEGER,
      used_item_id: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Fav',
      tableName: 'fav',
      timestamps: false
    }
  );

  return Fav;
};
