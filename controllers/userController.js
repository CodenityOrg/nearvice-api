const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const errors = require('../common/errors');

const login = async (req, res) => {
  try {
    const { email, password, keepMe } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw errors.notfound('User');
    if (!bcrypt.compareSync(password, user.password)) throw errors.unauthorized();
    const expiresIn = keepMe ? '1d' : '7d';
    const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn });
    return res.json({
      userId: user._id,
      token: token,
      expiresIn: expiresIn,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred trying to process your request',
    });
  }
};

const loginoauth = async (req, res) => {
  const client = new OAuth2Client('1096025496822-9r4uqvug35finf3ier0ig09ofjqge8oj.apps.googleusercontent.com');
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.tokenId,
      audience: '1096025496822-9r4uqvug35finf3ier0ig09ofjqge8oj.apps.googleusercontent.com',
      // Specify the CLIENT_ID of the app that accesses the backend
    });
    const payload = ticket.getPayload();
    const userid = payload.sub;
    console.log(payload);
  }
  verify()
    .then(() => {
      const { email } = req.body.profileObj;
      const user = await User.findOne({ email });
      if (!user) throw errors.notfound('User');
      const expiresIn = '7d';
      const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), { expiresIn });
      return res.json({
        userId: user._id,
        token: token,
        expiresIn: expiresIn,
      });
    }
    )
    .catch(console.error);
};

module.exports = {
  login,
  loginoauth,
};
