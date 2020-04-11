const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const test = require('./test');

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
        clientID: process.env.FACEBOOK_IDENT || test.facebookAuth.clientID,
        clientSecret: process.env.FACEBOOK_API_SECRET || test.facebookAuth.clientSecret,
        callbackURL: process.env.CALLBACK_URL || test.facebookAuth.clienttSecret,
        profileFields: ['id', 'displayName', 'name', 'email'],
      },
      ((accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
          // Realizar acciones a la base de datos
        //   User.findOne({ 'local.username': email }, (err, user) => {
        //     if (err) return done(err);
        //     if (user) {
        //       return done(null, false, req.flash('signupMessage', 'That email already taken'));
        //     }
        //     const newUser = new User();
        //     newUser.local.username = email;
        //     newUser.local.password = newUser.generateHash(password);

        //     newUser.save((err) => {
        //       if (err) throw err;
        //       return done(null, newUser);
        //     });
        //   });
        });
        return done(null, profile);
      }),
    ),
  );
};
