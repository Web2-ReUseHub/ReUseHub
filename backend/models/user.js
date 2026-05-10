'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User → UsedItem (البائع)
      User.hasMany(models.UsedItem, { 
        foreignKey: 'seller_id', 
        as: 'posts' 
      });

      // User ↔ UsedItem (Favorites)
      User.belongsToMany(models.UsedItem, {
        through: models.Fav,
        foreignKey: 'user_id',
        as: 'favorites'
      });

      // User ↔ UsedItem (Requests)
      User.belongsToMany(models.UsedItem, {
        through: models.Req,
        foreignKey: 'user_id',
        as: 'requests'
      });
    }
  }

  User.init(
    {
      user_id: {               
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      f_name: DataTypes.STRING,
      l_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'user',   // لازم يطابق اسم الجدول عندك
      timestamps: false    // إذا الجدول ما فيه createdAt و updatedAt
    }
  );

  return User;
};
