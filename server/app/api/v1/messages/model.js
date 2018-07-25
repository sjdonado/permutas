const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const fields = {
  title: {
    type: String,
    default: '',
    trim: true,
  },
  text: {
    type: String,
    default: '',
    trim: true,
  },
  kind: {
    type: String,
    default: 'interaction',
  },
};

const references = {
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
};

const message = new Schema(Object.assign(fields, references), {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

module.exports = {
  Model: mongoose.model('message', message),
  fields,
  references,
};
