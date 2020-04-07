/* eslint-disable no-undef */
const { connect, drop } = require('../loaders/database');

afterAll(async () => drop());

describe('Database', () => {
  it('DB Connection', async () => {
    expect(async () => connect())
      .not
      .toThrow();
  });
});
