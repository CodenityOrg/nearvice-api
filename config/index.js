const development = require('./development');
const production = require('./production');
const stage = require('./stage');
const local = require('./local');

const environments = {
  local,
  development,
  stage,
  production,
};

const initConfig = () => {
  const { NODE_ENV } = process.env;
  return environments[NODE_ENV] || local;
};

module.exports = initConfig();
