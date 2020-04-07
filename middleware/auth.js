const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = async function (req, res, next) {
  const token = req.header('token');
  if (!token) return res.status(401).json({ message: 'Auth Error' });

  try {
    const decoded = jwt.verify(token, req.app.get('secretKey'));
    const user = await User.findById(decoded.id);
    req.user = user.toJSON();
    return next();
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Invalid Token' });
  }
};
