var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var FeedbackSchema= new Schema ({
  feedback: String,
  subject: String,
  detail: String,
  resolve: Boolean,
  sort: {
    postive: Boolean,
    negative: Boolean
  }
});

var UserSchema = new Schema({
  username: String,
  full_name: String,
  email: String,
  password_digest: String,
  created_at: Date,
  updated_at: Date,
  feedback: [feedbackSchema]
});

UserSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
});

var UserModel = mongoose.model('User', UserSchema);
var FeedbackModel = mongoose.model('Feedback', FeedbackSchema)

module.exports = {
  User: UserModel,
  FB: FeedbackModel
}
