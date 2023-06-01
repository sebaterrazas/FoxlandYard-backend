'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: { model: 'Games', key: 'id' },
        allowNull: false
      },
      hasTrap: {
        type: Sequelize.BOOLEAN
      },
      foodType: {
        type: Sequelize.STRING
      },
      movementType: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tiles');
  }
};