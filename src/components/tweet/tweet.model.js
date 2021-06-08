let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let TweetSchema = new Schema(
  {
    username: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  },
  {
    versionKey: false
  }
);

TweetSchema.pre('save', next => {
  now = new Date();
  if(!this.createdAt) {
    this.createdAt = now;
  }
  next();
});

module.exports = mongoose.model('tweet', TweetSchema);