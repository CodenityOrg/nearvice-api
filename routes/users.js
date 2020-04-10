const express = require('express');
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/google', userController.loginGoogle);
router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/hello', auth, (req, res) => {
  console.log('ACCESS WITH AUTH MIDDLEWARE', req.user);
  res.json({ data: req.user });
});

module.exports = router;
