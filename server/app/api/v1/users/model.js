const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const {
  Schema,
} = mongoose;

const fields = {
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
    default: '',
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
    default: 'teacher',
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

const blacklistFields = ['password', 'role'];
// const cleanFields = ['password', 'role', '__v', 'createdAt', 'updatedAt', '_id'];


user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  blacklistFields.forEach((field) => {
    if (Object.hasOwnProperty.call(doc, field)) {
      delete doc[field];
    }
  });
  return doc;
};

user.pre('save', function Save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password);
  }
  next();
});

user.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password);
};

user.methods.isAdmin = function isAdmin() {
  return this.role === 'admin';
};

module.exports = {
  Model: mongoose.model('user', user),
  fields,
};