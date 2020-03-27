const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('respond with a resource');
});

router.post('/login', userController.login);
router.post('/register', userController.register);

module.exports = router;
