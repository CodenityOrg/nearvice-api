const bcrypt = require('bcrypt');
const User = require('../models/user');
const { errors, generateToken, buildError } = require('../common');

const DAY_IN_SECONDS = 24 * 60 * 60;

const login = async (req, res) => {
  try {
    const { email, password, keepMe } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw errors.notfound('User');
    if (!bcrypt.compareSync(password, user.password)) throw errors.unauthorized();
    const expiresIn = keepMe ? 7 * DAY_IN_SECONDS : DAY_IN_SECONDS;
    const token = generateToken({ id: user._id }, expiresIn, req.app);
    return res.json({
      userId: user._id,
      token: token,
      expiresIn: expiresIn,
    });
  } catch (error) {
    return buildError(res, error);
  }
};

const register = async (req, res) => {
  try {
    const data = req.body;
    if (!Object.keys(data).length) throw errors.badRequest();
    const user = await User.create(data);
    const userJson = user.toJSON();
    const expiresIn = DAY_IN_SECONDS;
    userJson.token = generateToken({ id: user._id }, expiresIn, req.app);
    return res.json(userJson);
  } catch (error) {
    return buildError(res, error);
  }
};

module.exports = {
  login,
  register,
};
