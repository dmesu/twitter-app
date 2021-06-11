let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let LikeSchema = new Schema(
  {
    usernameId: { type: String, required: true },
    tweetId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

LikeSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('like', LikeSchema);