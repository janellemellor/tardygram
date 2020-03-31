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
}, {
  toJSON: {
    transform: (doc, ret) => {
      delete ret.passwordHash;
    }
  }
});

schema.virtual('password').set(function(password) {
  const hash = bcrypt.hashSync(password, 14);
  this.passwordHash = hash;
});

schema.methods.authToken = function() {
  const token = jwt.sign({ payload: this.toJSON() }, process.env.APP_SECRET, {
    expiresIn: '24h'
  });
  return token;
};

module.exports = mongoose.model('User', schema);
