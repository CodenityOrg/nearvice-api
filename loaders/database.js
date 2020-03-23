const mongoose = require('mongoose');

const connect = () => mongoose
  .connect('mongodb://localhost:27017/nearvicedb', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch((error) => console.log(`DB Connection Error: ${error.message}`));

const drop = () => connect()
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => console.log('Droped!'));

module.exports = {
  connect,
  drop,
};
