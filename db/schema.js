var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

var FeedbackSchema= new Schema ({
  subject: String,
  detail: String,
  resolve: Boolean,
  type: Boolean,
  views: Number,
  created_at: Date,
  updated_at: Date
});

var UserSchema = new Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  name: {first_name: String, last_name: String},
  password_digest: String,
  feedback: [FeedbackSchema]
});

FeedbackSchema.pre('save', function(next) {
  now = new Date();
  this.updated_at = now;

  if (!this.created_at) { this.created_at = now }
  next()
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
  Feedback: FeedbackModel
}
