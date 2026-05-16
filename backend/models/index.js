'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const config = require('../config/config.json');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
  }
);

// تعيين sql_mode بعد الاتصال
sequelize.query("SET SESSION sql_mode = 'NO_ENGINE_SUBSTITUTION'")
  .catch(err => console.error('sql_mode error:', err.message));

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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("✅ Database synced & Tables created!");
  })
  .catch(err => {
    console.error("❌ Database sync error:", err.message);
  });

module.exports = db;