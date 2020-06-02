module.exports = {
  port: process.env.port,
  db: {
    host: process.env.DBHOST,
    name: process.env.DBNAME,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
  },
  facebook: {
    id: process.env.FB_ID,
    secret: process.env.FB_SECRET,
    callbackURL: process.env.FB_CALLBACK,
  },
  secretKey: process.env.SECRETKEY,
};
