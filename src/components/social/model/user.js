let mongoose = require('mongoose');
var createError = require('http-errors')
let Schema = mongoose.Schema;

let UserSchema = new Schema(
  {
    username: { type: String, unique: true, required: true }
  },
  {
    versionKey: false
  }
);

UserSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

UserSchema.post('save', function(error, doc, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    next(new createError(409, 'There was a duplicate key error'));
  } else {
    next();
  }
});

module.exports = mongoose.model('user', UserSchema);