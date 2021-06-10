let mongoose = require('mongoose');
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

module.exports = mongoose.model('user', UserSchema);