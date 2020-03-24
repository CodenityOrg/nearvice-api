const User = require('../models/user');

// TODO configure to test apis

const initialUsers = [
  {
    name: 'Florencia',
    lastname: 'Peretti',
    email: 'florenperetti@gmail.com',
    password: '123145435',
    city: 'Córdoba',
    country: 'Argentina',
    phone: null,
  },
];

test('user is created', () => {
  const firstUser = initialUsers[0];
  const userObject = new User(firstUser);
  expect(userObject.name).toBe(firstUser.name);
});
