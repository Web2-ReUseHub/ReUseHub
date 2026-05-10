'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const db = {};

// الربط المباشر باستخدام المتغيرات من ملف .env
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS, // تأكد إنها هيك مكتوبة عشان يقرأ "123456"
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      port: 3306,
      logging: false
    }
);

fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'))
    .forEach(file => {
      const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// هذه الحركة هي اللي رح تبني لك الجداول فوراً في الداتا بيز الفاضية
db.sequelize.sync({ alter: true })
    .then(() => console.log("✅ Database synced & Tables created!"))
    .catch(err => console.error("❌ Database sync error:", err.message));

module.exports = db;