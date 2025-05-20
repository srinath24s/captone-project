const mongoose = require('mongoose');
const {v4: uuid} = require('uuid');
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: uuid
  },

  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const adminUser = mongoose.model('AdminUser', userSchema);

module.exports = adminUser;