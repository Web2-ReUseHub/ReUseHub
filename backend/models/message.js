'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    static associate(models) {
      Message.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
      Message.belongsTo(models.User, { foreignKey: 'receiver_id', as: 'receiver' });
      Message.belongsTo(models.Req, { foreignKey: 'req_id', as: 'request' });
    }
  }

  Message.init(
    {
      msg_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sender_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      receiver_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      req_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'الطلب المرتبط بالرسالة'
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      sender_phone: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'رقم هاتف المُرسل (إذا أراد مشاركته)'
      },
      is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'Message',
      tableName: 'message',
      timestamps: true
    }
  );

  return Message;
};
