let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let FollowerSchema = new Schema(
  {
    username: { type: String, required: true },
    followee: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

FollowerSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('follower', FollowerSchema);