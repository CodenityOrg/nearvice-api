const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res) => {
  res.send('respond with a resource');
});


router.post('/login', userController.login);
router.post('/login/oauth', userController.loginoauth);

module.exports = router;
