module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Games', [ 
    {
      turn: 1,
      winner: 'ignaciolillo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      turn: 2,
      winner: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Games', null, {}),
};
