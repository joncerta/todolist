const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      maxlength: 2000,
    },
    state: {
      type: Number,
      trim: true,
      required: true,
      maxlength: 2,
    },
    userRef: {
      type: ObjectId,
      ref: 'User',
      required: true
    },
    photo: {
      data: Buffer,
      contentType: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
