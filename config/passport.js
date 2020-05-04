const FacebookStrategy = require('passport-facebook').Strategy;
const test = require('./local.json');

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
        clientID: process.env.FACEBOOK_IDENT || test.FACEBOOK_IDENT,
        clientSecret: process.env.FACEBOOK_API_SECRET || test.FACEBOOK_API_SECRET,
        callbackURL: process.env.CALLBACK_URL || test.CALLBACK_URL,
        profileFields: ['id', 'displayName', 'name', 'email'],
      },
      ((accessToken, refreshToken, profile, done) => done(null, profile)),
    ),
  );
};
