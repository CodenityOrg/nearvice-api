/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  stars: Number,
  jobs: [
    {
      type: Object,
    },
  ],
}, {
  timestamps: true,
});

specialistSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Specialist = mongoose.model('Specialist', specialistSchema);

module.exports = Specialist;
