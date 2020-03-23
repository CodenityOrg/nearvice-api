const { connect } = require('./database');

const init = () => {
  const loaders = Promise.all([
        connect(),
  ]);
  return loaders;
};

module.exports = {
  init,
};