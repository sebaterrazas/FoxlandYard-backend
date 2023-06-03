module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [ 
    {
      username: 'sebaterrazas',
      password: 'cr7siu',
      mail: 'sebaterrazas@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'ignaciolillo',
      password: 'ignacio123',
      mail: 'ignaciolillo@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
