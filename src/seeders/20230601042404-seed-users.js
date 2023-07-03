const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [
    {
      username: 'sebaterrazas',
      password: '$2a$09$gO5qSE7MLbaQ0p3bYmsul.WKa7w3p6OwEOusQzWx3BouWbl6MrAQO', // cr7siu
      mail: 'sebaterrazas@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'ignaciolillo',
      password: '$2a$09$tKVZ0PwUk3e/5VkjaVJYuucD5l2xmPOWsun92ozRLjVnHLQCAuh.i', // ignacio123
      mail: 'ignaciolillo@uc.cl',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'rogerfederer',
      password: '$2a$04$DYocD/VKCoPAq/1zYbieVuGfQ2o42NPTJ8oqx5qc501KUj70mhdo6', // relojSuizo99
      mail: 'roger@federer.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'georgeclooney',
      password: '$2a$04$FwWsyb8d5rj2aweArhuiiO83psTjAmNL7IiIbhNk2GHJL2Yc2FC7m', // what-else-777
      mail: 'georgeclooney@hollywood.us',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};
