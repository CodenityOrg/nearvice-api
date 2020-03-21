const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});


router.post('/login', userController.login);

module.exports = router;
