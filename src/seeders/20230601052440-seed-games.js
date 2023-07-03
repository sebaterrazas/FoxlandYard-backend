module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [
    {
      current_turn: 'Mr. Fox',
      winner: 'ignaciolillo',
      plays_left: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      current_turn: 'Mr. Boggis',
      winner: null,
      plays_left: 24,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      current_turn: 'Mr. Bean',
      winner: null,
      plays_left: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
};
