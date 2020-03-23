const { connect, drop } = require('../loaders/database');

afterAll(async () => await drop());

describe('Database', () => {
  it('DB Connection', async () => {
    expect(async () => await connect())
      .not
      .toThrow();
  });
});
