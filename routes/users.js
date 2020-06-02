const express = require('express');
const passport = require('passport');
const auth = require('../middleware/auth');
const authGoogle = require('../middleware/authGoogle');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});
router.get('/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.json(req.user)
    // TODO: Sync Facebook Data from Passport. This function returns "Bad Request" error, due unexpected fields from Passport
    // userController.facebookLogin(req, res);
  });
router.post('/google', authGoogle, userController.loginGoogle);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/hello', auth, (req, res) => {
  console.log('ACCESS WITH AUTH MIDDLEWARE', req.user);
  res.json({ data: req.user });
});

module.exports = router;
