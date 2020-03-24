const mongoose = require('mongoose');
// const app = require('./app');

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to mongo db');
//   app.listen(PORT, () => {
//     console.log(`running in port ${PORT}`);
//   });
}).catch(error => {
  console.log('mongo_db_error', error);

});