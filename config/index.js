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

const getDbURI = ({
  host, port, name, user = '', password = '',
}) => {
  const uri = 'mongodb://';
  const defaultUri = `${host}${port ? `:${port}` : ''}/${name}`;

  const hasCredentials = user && password;

  if (hasCredentials) {
    return `${uri}${user}:${password}@${defaultUri}`;
  }

  return `${uri}${defaultUri}`;
};

const initConfig = () => {
  const { NODE_ENV } = process.env;
  const config = environments[NODE_ENV] || local;
  const { db = local.db } = config;
  return {
    ...config,
    dbURI: getDbURI(db),
  };
};

module.exports = initConfig();
