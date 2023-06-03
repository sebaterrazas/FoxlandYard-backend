/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Nodes', {
      nodeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gameId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Games', key: 'id' },
        allowNull: false,
      },
      location: {
        type: Sequelize.STRING,
      },
      hasTrap: {
        type: Sequelize.BOOLEAN,
      },
      foodType: {
        type: Sequelize.STRING,
      },
      movementType: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Nodes');
  },
};
