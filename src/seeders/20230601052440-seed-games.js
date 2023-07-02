module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      turn: 1,
      winner: 'ignaciolillo',
      plays_left: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turn: 2,
      winner: null,
      plays_left: 24,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turn: 1,
      winner: null,
      plays_left: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
};
