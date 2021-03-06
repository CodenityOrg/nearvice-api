/* eslint-disable no-undef */
const mongoose = require('mongoose');
const { connect, drop } = require('../loaders/database');
const User = require('../models/user');

beforeAll(async () => connect());

afterAll(async () => drop());

beforeEach(async () => User.deleteMany({}));

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

describe('User', () => {
  test('create a valid user', async () => {
    const validUser = new User(initialUsers[0]);
    const savedUser = await validUser.save();
    expect(savedUser).toHaveProperty('_id');
    expect(savedUser).toHaveProperty('name', initialUsers[0].name);
    expect(savedUser).toHaveProperty('lastname', initialUsers[0].lastname);
    expect(savedUser).toHaveProperty('email', initialUsers[0].email);
    expect(savedUser).toHaveProperty('password');
    expect(savedUser).toHaveProperty('city', initialUsers[0].city);
    expect(savedUser).toHaveProperty('country', initialUsers[0].country);
  });

  test('hash password', async () => {
    const validUser = new User(initialUsers[0]);
    const savedUser = await validUser.save();
    expect(savedUser).toHaveProperty('password');
    expect(savedUser.password).not.toEqual(initialUsers[0].password);
    expect(savedUser.password).toHaveLength(60);
  });

  test('use toJSON user method', async () => {
    const validUser = new User(initialUsers[0]);
    const savedUser = await validUser.save();
    const userJson = savedUser.toJSON();
    expect(userJson).not.toHaveProperty('_id');
    expect(userJson).not.toHaveProperty('__v');
    expect(userJson).toHaveProperty('id');
  });

  test('create user without required field should failed', async () => {
    const userWithoutRequiredField = new User({ name: 'TekLoon' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    return expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
  });
});
