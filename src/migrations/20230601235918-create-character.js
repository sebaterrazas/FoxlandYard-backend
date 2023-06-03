/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gameId: {
        type: Sequelize.INTEGER,
        references: { model: 'Games', key: 'id' },
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        references: { model: 'Users', key: 'id' },
        allowNull: false,
      },
      nodeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      food: {
        type: Sequelize.INTEGER,
      },
      walkCards: {
        type: Sequelize.INTEGER,
      },
      bikeCards: {
        type: Sequelize.INTEGER,
      },
      carCards: {
        type: Sequelize.INTEGER,
      },
      burrowCards: {
        type: Sequelize.INTEGER,
      },
      isAsh: {
        type: Sequelize.BOOLEAN,
      },
      isKris: {
        type: Sequelize.BOOLEAN,
      },
      isKyle: {
        type: Sequelize.BOOLEAN,
      },
      isRat: {
        type: Sequelize.BOOLEAN,
      },
      name: {
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
    await queryInterface.dropTable('Characters');
  },
};
