/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
require('mongoose-type-email');

const saltRounds = 10;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastname: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  city: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  phone: String,
  specialist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialist',
  },
}, {
  timestamps: true,
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    // the password should not be revealed
    delete returnedObject.password;
  },
});

userSchema.plugin(uniqueValidator);

// hash user password before saving into database
userSchema.pre('save', function (next) {
  if (!this.password) next();
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
