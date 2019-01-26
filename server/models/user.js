const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const SALT = 10;


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

userSchema.pre('save', function(next){
  const user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(SALT, function(err, salt){
      if(err){
        return next(err);
      }
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err){
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  }else{
    next();
  }
});

userSchema.methods.comparePassword = function(enteredPassword, cb){
  bcrypt.compare(enteredPassword, this.password, function(err, isMatch){
    if(err){
      return cb(err);
    }
    cb(null, isMatch);
  })
};

userSchema.methods.generateToken = function(cb){
  const user = this;
  const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.token = token;
  user.save()
  .then(user => {
    return cb(null, user);
  })
  .catch(err => {
    return cb(err);
  })
};

const User = mongoose.model("User", userSchema);

module.exports = { User };