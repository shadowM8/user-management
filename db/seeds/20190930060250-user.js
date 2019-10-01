module.exports = {
  up: queryInterface => queryInterface.bulkInsert('user_name', [
    {
      username: 'superadmin01@mail.com',
      password: '123',
    },
  ], {}),
  down: queryInterface => queryInterface.bulkDelete('user_name', null, {}),
};
