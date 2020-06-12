const FacebookStrategy = require('passport-facebook').Strategy;
const config = require('env-config-params')();
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook.id,
      clientSecret: config.facebook.apiSecret,
      callbackURL: config.facebook.callbackUrl,
      profileFields: ['id', 'displayName', 'name', 'email'],
    },
    ((accessToken, refreshToken, profile, done) => done(null, profile)),
  ),
);
