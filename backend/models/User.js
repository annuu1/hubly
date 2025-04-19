const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String, unique: true, trim: true, sparse: true },
  email: { type: String, unique: true, lowercase: true, trim: true, required: true },
  username: { type: String, unique: true, trim: true, sparse: true },
  role: { type: String, enum: ['admin', 'member'], default: 'member' },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);