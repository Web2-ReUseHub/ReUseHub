'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

// قراءة إعدادات قاعدة البيانات من config/config.json
const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// إنشاء الاتصال باستخدام إعدادات config.json
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false
  }
);

// تحميل جميع الـ Models تلقائياً
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js'
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// تنفيذ العلاقات بين الجداول
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// مزامنة قاعدة البيانات
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced & Tables created!");
  })
  .catch(err => {
    console.error("❌ Database sync error:", err.message);
  });

module.exports = db;