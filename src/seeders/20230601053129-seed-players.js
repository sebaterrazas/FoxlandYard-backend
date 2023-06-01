module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Players', [ 
    {
      userId: 1,
      gameId: 2,
      name: 'Jaime',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      userId: 2,
      gameId: 2,
      name: 'Jaime',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Players', null, {}),
};