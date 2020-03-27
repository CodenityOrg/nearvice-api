const bcrypt = require('bcrypt');
const User = require('../models/user');
const { errors, generateToken } = require('../common');

const login = async (req, res) => {
  try {
    const { email, password, keepMe } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw errors.notfound('User');
    if (!bcrypt.compareSync(password, user.password)) throw errors.unauthorized();
    const expiresIn = keepMe ? '1d' : '7d';
    const token = generateToken({ id: user._id }, expiresIn);
    return res.json({
      userId: user._id,
      token: token,
      expiresIn: expiresIn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred trying to process your request',
    });
  }
};

const register = async (req, res) => {
  try {
    const data = req.body;
    if (!Object.keys(data).length) throw errors.badRequest();
    const user = await User.create(data);
    const userJson = user.toJSON();
    const expiresIn = '1d';
    userJson.token = generateToken({ id: user._id }, expiresIn, req.app);
    return res.json(userJson);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred trying to process your request',
    });
  }
};

module.exports = {
  login,
  register,
};
