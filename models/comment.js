const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({

  content: {
    type: String,
    required: [true, 'Comentario obligatorio'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Specialist',
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  likes: [{
    id: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true,
});

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
