const bcrypt = require('bcrypt');
const User = require('../models/user');
const errors = require('../common/errors');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) throw errors.notfound('User');
        if (!bcrypt.compareSync(password, user.password)) throw errors.unauthorized();
        return res.json(currentUser);
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = {
    login,
};