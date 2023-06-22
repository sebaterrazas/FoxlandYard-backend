module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('MrFoxMovements', [
    {
      gameId: 1,
      movementType: 'walk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gameId: 1,
      movementType: 'walk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('MrFoxMovements', null, {}),
};