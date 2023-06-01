'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
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
      playerId: {
        type: Sequelize.INTEGER,
        references: { model: 'Players', key: 'id' },
        allowNull: false
      },
      tileId: {
        type: Sequelize.INTEGER,
        references: { model: 'Tiles', key: 'id' }
      },
      traps: {
        type: Sequelize.INTEGER
      },
      food: {
        type: Sequelize.INTEGER
      },
      walkCards: {
        type: Sequelize.INTEGER
      },
      bikeCards: {
        type: Sequelize.INTEGER
      },
      carCards: {
        type: Sequelize.INTEGER
      },
      tunnelCard: {
        type: Sequelize.BOOLEAN
      },
      isAsh: {
        type: Sequelize.BOOLEAN
      },
      isKris: {
        type: Sequelize.BOOLEAN
      },
      isKyle: {
        type: Sequelize.BOOLEAN
      },
      isRat: {
        type: Sequelize.BOOLEAN
      },
      name: {
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
    await queryInterface.dropTable('Characters');
  }
};