const FacebookStrategy = require('passport-facebook').Strategy;
const local = require('./local.json');

require('dotenv').config();

module.exports = function (passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FB_ID || local.facebook.id,
        clientSecret: process.env.FB_SECRET || local.facebook.secret,
        callbackURL: process.env.FB_CALLBACK || local.facebook.callbackURL,
        profileFields: ['id', 'displayName', 'name', 'email'],
      },
      ((accessToken, refreshToken, profile, done) => done(null, profile)),
    ),
  );
};
