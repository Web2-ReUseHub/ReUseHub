'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('likes', {
      like_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'user', key: 'user_id' }
      },
      used_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'used_item', key: 'used_item_id' }
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('likes');
  }
};