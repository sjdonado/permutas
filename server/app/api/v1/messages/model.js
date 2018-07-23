const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const fields = {
  text: {
    type: String,
    default: '',
    trim: true,
  },
  read: [
    {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
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

message.pre('save', function Save(next) {
  this.read.push(this.id);
  next();
});

module.exports = {
  Model: mongoose.model('message', message),
  fields,
  references,
};
