/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Connections', {
      node1Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      node2Id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      movementType: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
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
    await queryInterface.dropTable('Connections');
  },
};
