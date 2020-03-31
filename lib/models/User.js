const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Username already exists']
  },
  passwordHash: {
    type: String, 
    required: true
  }, 
  profilePhotoUrl: {
    type: String
      
  }
});

module.exports = mongoose.model('User', schema);
