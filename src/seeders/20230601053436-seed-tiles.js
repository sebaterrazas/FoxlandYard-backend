module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Tiles', [ 
    {
      gameId: 2,
      hasTrap: false,
      foodType: 'apple',
      movementType: 'walk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      gameId: 2,
      hasTrap: false,
      foodType: 'apple',
      movementType: 'walk',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Tiles', null, {}),
};