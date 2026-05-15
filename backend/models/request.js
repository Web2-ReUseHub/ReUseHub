'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Req extends Model {
    static associate(models) {
      // كل طلب مربوط بمستخدم (المشتري)
      Req.belongsTo(models.User, { foreignKey: 'user_id', as: 'buyer' });
      // وكل طلب مربوط بمنتج مستخدم
      Req.belongsTo(models.UsedItem, { foreignKey: 'used_item_id', as: 'product' });
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
        allowNull: false,
        comment: 'المشتري'
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
      },
      status: {
        type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
        defaultValue: 'pending',
        comment: 'حالة الطلب: قيد الانتظار، موافق عليه، مرفوض'
      },
      seller_message: {
        type: DataTypes.TEXT,
        comment: 'الرسالة المُرسلة للمشتري عند القبول'
      }
    },
    {
      sequelize,
      modelName: 'Req',
      tableName: 'req',
      timestamps: true
    }
  );

  return Req;
};
