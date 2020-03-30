const { connect, drop } = require('./database');

const init = () => {
  const loaders = Promise.all([connect()]);
  return loaders;
};

const reset = () => {
  const loaders = Promise.all([drop().then(() => connect())]);
  return loaders;
};

module.exports = {
  init,
  reset,
};
