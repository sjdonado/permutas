const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {
  Schema,
} = mongoose;

const fields = {
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  fullname: {
    type: String,
    required: true,
    trim: true,
  },
  dni: {
    type: Number,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
  phone: {
    type: Number,
    min: 7,
  },
  mobilePhone: {
    type: Number,
    min: 10,
  },
  department: {
    type: String,
    required: true,
  },
  municipality: {
    type: String,
    required: true,
  },
  village: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  educationalLadder: {
    type: String,
    required: true,
  },
  appointment: {
    type: String,
    required: true,
  },
  swapDepartment: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  delete doc.password;
  return doc;
};

user.pre('save', function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSalt());
  }
  next();
});

user.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};
