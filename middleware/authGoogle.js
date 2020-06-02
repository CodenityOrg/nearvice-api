const { OAuth2Client } = require('google-auth-library');
const config = require('env-config-params')();

module.exports = async function (req, res, next) {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: 'Auth Error' });

  try {
    const client = new OAuth2Client(config.googleClientId);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: config.googleClientId,
    });
    req.payload = ticket.getPayload();
    return next();
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
